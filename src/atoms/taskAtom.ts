import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDate } from "./dateAtom";
import { useAuth } from "./authAtom";
import { useEffect } from "react";
import { Unsubscribe } from "firebase/firestore";
import { Task } from "types/TodoTask.type";
import { listenToTasks } from "api/tasks/listenToTasks";

interface ITaskAtom {
  tasks?: Record<string, Task>;
  loading: boolean;
  error?: string;
}

const taskAtom = atom<ITaskAtom>({ loading: true });
export function useTaskState() {
  return useAtom(taskAtom);
}

export function useTasks() {
  return useAtomValue(taskAtom);
}

export function useSetTasks() {
  return useSetAtom(taskAtom);
}

export function useListenToTasks() {
  const date = useDate();
  const uid = useAuth().uid;

  const setTasks = useSetTasks();

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    setTasks({ loading: true });
    if (date && uid) {
      unsubscribe = listenToTasks(
        { date, uid },
        (tasks) => setTasks({ tasks, loading: false }),
        (error) => setTasks({ loading: false, error })
      );
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [date, uid, setTasks]);
}
