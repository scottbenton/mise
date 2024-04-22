import { Box, Card, Skeleton, Stack } from "@mui/material";
import { useLoadTasks } from "./useLoadTasks";
import { TaskList } from "./TaskList";

export interface TodoListProps {
  date: Date;
}

export function TodoList(props: TodoListProps) {
  const { date } = props;

  const { tasks: initialTasks, loading, error } = useLoadTasks(date);

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
      {!loading && !error && initialTasks && (
        <TaskList date={date} initialTaskList={initialTasks} />
      )}
    </Card>
  );
}
