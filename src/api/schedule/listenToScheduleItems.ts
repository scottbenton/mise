import { Unsubscribe, onSnapshot, query, where } from "firebase/firestore";
import { constructDateString } from "functions/constructDateString";
import { getScheduleCollection } from "./_getRef";
import { Schedule } from "types/Schedule.type";

export function listenToScheduleItems(
  params: { date: Date; uid: string },
  onItems: (items: Record<string, Schedule>) => void,
  onError: (error: string) => void
): Unsubscribe {
  const { date, uid } = params;

  const dateString = constructDateString(date);

  const scheduleQuery = query(
    getScheduleCollection(),
    where("date", "==", dateString),
    where("uid", "==", uid)
  );

  return onSnapshot(
    scheduleQuery,
    (snapshot) => {
      const scheduleMap: Record<string, Schedule> = {};
      snapshot.docs.forEach((doc) => {
        scheduleMap[doc.id] = doc.data();
      });
      onItems(scheduleMap);
    },
    (error) => onError(error.message)
  );
}
