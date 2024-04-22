import { createApiFunction } from "api/createApiFunction";
import { getDocs, query, where } from "firebase/firestore";
import { constructDateString } from "functions/constructDateString";
import { Task } from "types/TodoTask.type";
import { getTasksCollection } from "./_getRef";

export const getTasks = createApiFunction<
  { date: Date; uid: string },
  Record<string, Task>
>(
  ({ date, uid }) =>
    new Promise((resolve, reject) => {
      const dateString = constructDateString(date);

      const taskQuery = query(
        getTasksCollection(),
        where("date", "==", dateString),
        where("uid", "==", uid)
      );
      getDocs(taskQuery)
        .then((snapshot) => {
          const taskMap: Record<string, Task> = {};
          snapshot.docs.forEach((doc) => {
            taskMap[doc.id] = doc.data();
          });
          resolve(taskMap);
        })
        .catch(reject);
    }),
  "Failed to load tasks"
);
