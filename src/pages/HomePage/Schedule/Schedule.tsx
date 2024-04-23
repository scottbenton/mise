import { Box, Card, Skeleton, Stack } from "@mui/material";
import { ScheduleDisplay } from "./ScheduleDisplay";
import {
  useListenToScheduleItems,
  useScheduleItems,
} from "atoms/scheduleItemAtom";

export interface ScheduleProps {
  date: Date;
}

export function Schedule(props: ScheduleProps) {
  const { date } = props;

  useListenToScheduleItems();

  const { items, loading, error } = useScheduleItems();

  return (
    <Card variant={"outlined"}>
      {loading && (
        <Stack spacing={1} sx={{ p: 2 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Stack>
      )}
      {error && <Box p={2}>{error}</Box>}
      {!loading && !error && items && (
        <ScheduleDisplay date={date} items={items} />
      )}
    </Card>
  );
}
