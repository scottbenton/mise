import { Unsubscribe, onSnapshot, query, where } from "firebase/firestore";
import { constructDateString } from "functions/constructDateString";
import { getTasksCollection } from "./_getRef";
import { Task } from "types/TodoTask.type";

export function listenToTasks(
  params: { date: Date; uid: string },
  onTasks: (items: Record<string, Task>) => void,
  onError: (error: string) => void
): Unsubscribe {
  const { date, uid } = params;

  const dateString = constructDateString(date);

  const taskQuery = query(
    getTasksCollection(),
    where("date", "==", dateString),
    where("uid", "==", uid)
  );

  return onSnapshot(
    taskQuery,
    (snapshot) => {
      const taskMap: Record<string, Task> = {};
      snapshot.docs.forEach((doc) => {
        taskMap[doc.id] = doc.data();
      });
      onTasks(taskMap);
    },
    (error) => onError(error.message)
  );
}
