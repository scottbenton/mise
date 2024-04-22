import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

interface IAuthAtom {
  uid?: string;
  username?: string;
  loading: boolean;
  error?: Error;
}

const authAtom = atom<IAuthAtom>({ loading: true });
export function useAuthState() {
  return useAtom(authAtom);
}

export function useAuth() {
  return useAtomValue(authAtom);
}

export function useSetAuth() {
  return useSetAtom(authAtom);
}
