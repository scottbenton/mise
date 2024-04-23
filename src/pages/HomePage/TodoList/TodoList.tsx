import { Box, Card, Skeleton, Stack } from "@mui/material";
import { TaskList } from "./TaskList";
import { useListenToTasks, useTasks } from "atoms/taskAtom";

export interface TodoListProps {
  date: Date;
}

export function TodoList(props: TodoListProps) {
  const { date } = props;

  useListenToTasks();

  const { tasks, loading, error } = useTasks();

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
      {!loading && !error && tasks && <TaskList date={date} tasks={tasks} />}
    </Card>
  );
}
