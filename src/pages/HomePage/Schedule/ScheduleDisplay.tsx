import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";
import { createScheduleItem } from "api/schedule/createScheduleItem";
import { deleteScheduleItem } from "api/schedule/deleteScheduleItem";
import { useInvokeApiFunction } from "api/useApiFunction";
import { useAuth } from "atoms/authAtom";
import dayjs from "dayjs";
import { constructDateString } from "functions/constructDateString";
import { useState } from "react";
import { Schedule } from "types/Schedule.type";
import DeleteIcon from "@mui/icons-material/Delete";
import { TimePicker } from "@mui/x-date-pickers";
import { HoverRow } from "../HoverRow";
import { useIsMobileDevice } from "functions/useIsMobileDevice";

export interface ScheduleDisplayProps {
  date: Date;
  items: Record<string, Schedule>;
}

export function ScheduleDisplay(props: ScheduleDisplayProps) {
  const { date, items } = props;

  const uid = useAuth().uid ?? "";

  const sortedScheduleKeys = Object.keys(items).sort((i1, i2) => {
    const dateA = new Date();
    dateA.setHours(items[i1].time.hours);
    dateA.setMinutes(items[i1].time.minutes);
    const dateB = new Date();
    dateB.setHours(items[i2].time.hours);
    dateB.setMinutes(items[i2].time.minutes);

    const timeA = dateA.getTime() % (1000 * 60 * 60 * 24);
    const timeB = dateB.getTime() % (1000 * 60 * 60 * 24);

    // Sort by time difference
    return timeA - timeB;
  });

  const [newItemLabel, setNewItemLabel] = useState("");
  const [newItemTime, setNewItemTime] = useState<dayjs.Dayjs | null>(null);

  const { call: addItemFn } = useInvokeApiFunction(
    createScheduleItem,
    "add",
    "schedule item"
  );
  const handleAddScheduleItem = () => {
    const newScheduleItem: Schedule = {
      label: newItemLabel,
      uid,
      date: constructDateString(date),
      time: {
        hours: newItemTime?.hour() ?? 0,
        minutes: newItemTime?.minute() ?? 0,
      },
    };
    setNewItemLabel("");
    setNewItemTime(null);
    addItemFn(newScheduleItem).catch(() => {});
  };

  const { call: deleteScheduleFn } = useInvokeApiFunction(
    deleteScheduleItem,
    "delete",
    "schedule item"
  );
  const handleDeleteScheduleItem = (itemId: string) => {
    deleteScheduleFn({ itemId }).catch(() => {});
  };

  const isMobileDevice = useIsMobileDevice();

  return (
    <Box>
      <Table size={"small"}>
        <TableBody>
          {sortedScheduleKeys.map((itemId) => {
            const date = new Date();
            date.setHours(items[itemId].time.hours);
            date.setMinutes(items[itemId].time.minutes);
            return (
              <HoverRow
                key={itemId}
                cells={(isHovering) => (
                  <>
                    <TableCell align={"right"} sx={{ width: "10ch" }}>
                      {dayjs(date).format("h:mm a")}
                    </TableCell>
                    <TableCell padding="none">{items[itemId].label}</TableCell>
                    <TableCell align={"right"}>
                      {isHovering || isMobileDevice ? (
                        <IconButton
                          onClick={() => handleDeleteScheduleItem(itemId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        <Box height={40} />
                      )}
                    </TableCell>
                  </>
                )}
              />
            );
          })}
        </TableBody>
      </Table>

      <Box px={2} py={1}>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleAddScheduleItem();
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <TimePicker
              slotProps={{
                textField: {
                  variant: "standard",
                },
              }}
              value={newItemTime}
              onChange={(value) => setNewItemTime(value)}
            />
            <TextField
              value={newItemLabel}
              onChange={(evt) => setNewItemLabel(evt.target.value)}
              // size={"small"}
              variant="standard"
              placeholder="Schedule Description"
              fullWidth
            />
            <Button type={"submit"}>Add</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
