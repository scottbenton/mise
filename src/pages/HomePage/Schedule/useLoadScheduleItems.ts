import { getScheduleItems } from "api/schedule/getScheduleItems";
import { useApiFunctionImmediately } from "api/useApiFunction";
import { useAuth } from "atoms/authAtom";
import { useMemo } from "react";

export function useLoadScheduleItems(date: Date) {
  const uid = useAuth().uid ?? "";

  const params = useMemo(
    () => ({
      date,
      uid,
    }),
    [date, uid]
  );

  const {
    data: items,
    loading,
    error,
  } = useApiFunctionImmediately(
    params,
    getScheduleItems,
    "get",
    "schedule items"
  );

  return { items, loading, error };
}
