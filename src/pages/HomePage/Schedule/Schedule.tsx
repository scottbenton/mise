import { Box, Card, Skeleton, Stack } from "@mui/material";
import { useLoadScheduleItems } from "./useLoadScheduleItems";
import { ScheduleDisplay } from "./ScheduleDisplay";

export interface ScheduleProps {
  date: Date;
}

export function Schedule(props: ScheduleProps) {
  const { date } = props;

  const { items, loading, error } = useLoadScheduleItems(date);

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
        <ScheduleDisplay date={date} initialSchedule={items} />
      )}
    </Card>
  );
}
