import { getTasks } from "api/tasks/getTasks";
import { useApiFunctionImmediately } from "api/useApiFunction";
import { useAuth } from "atoms/authAtom";
import { useMemo } from "react";

export function useLoadTasks(date: Date) {
  const uid = useAuth().uid ?? "";

  const params = useMemo(
    () => ({
      date,
      uid,
    }),
    [date, uid]
  );

  const {
    data: tasks,
    loading,
    error,
  } = useApiFunctionImmediately(params, getTasks, "get", "tasks");

  return { tasks, loading, error };
}
