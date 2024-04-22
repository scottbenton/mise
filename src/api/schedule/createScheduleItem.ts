import { createApiFunction } from "api/createApiFunction";
import { addDoc } from "firebase/firestore";
import { getScheduleCollection } from "./_getRef";
import { Schedule } from "types/Schedule.type";

export const createScheduleItem = createApiFunction<Schedule, string>(
  (task) =>
    new Promise((resolve, reject) => {
      addDoc(getScheduleCollection(), task)
        .then((doc) => resolve(doc.id))
        .catch(reject);
    }),
  "Failed to create schedule item"
);
