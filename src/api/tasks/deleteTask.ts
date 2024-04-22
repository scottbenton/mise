import { createApiFunction } from "api/createApiFunction";
import { deleteDoc } from "firebase/firestore";
import { getTaskDoc } from "./_getRef";

export const deleteTask = createApiFunction<{ taskId: string }, void>(
  ({ taskId }) =>
    new Promise((resolve, reject) => {
      deleteDoc(getTaskDoc(taskId))
        .then(() => resolve())
        .catch(reject);
    }),
  "Failed to delete task"
);
