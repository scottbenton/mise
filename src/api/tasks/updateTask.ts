import { createApiFunction } from "api/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { Task } from "types/TodoTask.type";
import { getTaskDoc } from "./_getRef";

export const updateTask = createApiFunction<
  { task: PartialWithFieldValue<Task>; taskId: string },
  void
>(
  ({ taskId, task }) =>
    new Promise((resolve, reject) => {
      updateDoc(getTaskDoc(taskId), task)
        .then(() => resolve())
        .catch(reject);
    }),
  "Failed to update task"
);
