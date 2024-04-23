import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const dateAtom = atom<Date | undefined>(new Date());

export function useDateState() {
  return useAtom(dateAtom);
}

export function useDate() {
  return useAtomValue(dateAtom);
}

export function useSetDate() {
  return useSetAtom(dateAtom);
}
