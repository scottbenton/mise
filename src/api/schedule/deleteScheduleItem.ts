import { createApiFunction } from "api/createApiFunction";
import { deleteDoc } from "firebase/firestore";
import { getScheduleDoc } from "./_getRef";

export const deleteScheduleItem = createApiFunction<{ itemId: string }, void>(
  ({ itemId }) =>
    new Promise((resolve, reject) => {
      deleteDoc(getScheduleDoc(itemId))
        .then(() => resolve())
        .catch(reject);
    }),
  "Failed to delete schedule item"
);
