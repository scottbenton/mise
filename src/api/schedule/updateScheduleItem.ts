import { createApiFunction } from "api/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { Schedule } from "types/Schedule.type";
import { getScheduleDoc } from "./_getRef";

export const updateScheduleItem = createApiFunction<
  { schedule: PartialWithFieldValue<Schedule>; itemId: string },
  void
>(
  ({ itemId, schedule }) =>
    new Promise((resolve, reject) => {
      updateDoc(getScheduleDoc(itemId), schedule)
        .then(() => resolve())
        .catch(reject);
    }),
  "Failed to update schedule"
);
