import { createApiFunction } from "api/createApiFunction";
import { addDoc } from "firebase/firestore";
import { Task } from "types/TodoTask.type";
import { getTasksCollection } from "./_getRef";

export const createTask = createApiFunction<Task, string>(
  (task) =>
    new Promise((resolve, reject) => {
      addDoc(getTasksCollection(), task)
        .then((doc) => resolve(doc.id))
        .catch(reject);
    }),
  "Failed to create task"
);
