import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "lib/firestore";
import { Task } from "types/TodoTask.type";

export function getTasksCollection(): CollectionReference<Task> {
  return collection(firestore, "tasks") as CollectionReference<Task>;
}

export function getTaskDoc(docId: string): DocumentReference<Task> {
  return doc(firestore, `tasks/${docId}`) as DocumentReference<Task>;
}
