import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Schedule } from "types/Schedule.type";
import { useDate } from "./dateAtom";
import { useAuth } from "./authAtom";
import { useEffect } from "react";
import { Unsubscribe } from "firebase/firestore";
import { listenToScheduleItems } from "api/schedule/listenToScheduleItems";

interface IScheduleAtom {
  items?: Record<string, Schedule>;
  loading: boolean;
  error?: string;
}

const scheduleAtom = atom<IScheduleAtom>({ loading: true });
export function useScheduleItemState() {
  return useAtom(scheduleAtom);
}

export function useScheduleItems() {
  return useAtomValue(scheduleAtom);
}

export function useSetScheduleItems() {
  return useSetAtom(scheduleAtom);
}

export function useListenToScheduleItems() {
  const date = useDate();
  const uid = useAuth().uid;

  const setScheduleItems = useSetScheduleItems();

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    setScheduleItems({ loading: true });
    if (date && uid) {
      unsubscribe = listenToScheduleItems(
        { date, uid },
        (items) => setScheduleItems({ items, loading: false }),
        (error) => setScheduleItems({ loading: false, error })
      );
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [date, uid, setScheduleItems]);
}
