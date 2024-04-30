import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface Settings {
  keepScreenOn: boolean;
}

const settingsAtom = atomWithStorage<Settings>("settings", {
  keepScreenOn: false,
});

export function useSettingsState() {
  return useAtom(settingsAtom);
}

export function useSettings() {
  return useAtomValue(settingsAtom);
}

export function useSetSettings() {
  return useSetAtom(settingsAtom);
}
