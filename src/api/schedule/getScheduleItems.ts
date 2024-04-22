import { createApiFunction } from "api/createApiFunction";
import { getDocs, query, where } from "firebase/firestore";
import { constructDateString } from "functions/constructDateString";
import { getScheduleCollection } from "./_getRef";
import { Schedule } from "types/Schedule.type";

export const getScheduleItems = createApiFunction<
  { date: Date; uid: string },
  Record<string, Schedule>
>(
  ({ date, uid }) =>
    new Promise((resolve, reject) => {
      const dateString = constructDateString(date);

      const scheduleQuery = query(
        getScheduleCollection(),
        where("date", "==", dateString),
        where("uid", "==", uid)
      );
      getDocs(scheduleQuery)
        .then((snapshot) => {
          const scheduleMap: Record<string, Schedule> = {};
          snapshot.docs.forEach((doc) => {
            scheduleMap[doc.id] = doc.data();
          });
          resolve(scheduleMap);
        })
        .catch(reject);
    }),
  "Failed to load schedule items"
);
