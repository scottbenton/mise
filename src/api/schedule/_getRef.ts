import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "lib/firestore";
import { Schedule } from "types/Schedule.type";

export function getScheduleCollection(): CollectionReference<Schedule> {
  return collection(firestore, "schedule") as CollectionReference<Schedule>;
}

export function getScheduleDoc(docId: string): DocumentReference<Schedule> {
  return doc(firestore, `schedule/${docId}`) as DocumentReference<Schedule>;
}
