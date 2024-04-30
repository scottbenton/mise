import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export enum Cycle {
  Work,
  Break,
  LongBreak,
}
export const cycleLengths: Record<Cycle, number> = {
  [Cycle.Break]: 5 * 1000 * 60,
  [Cycle.LongBreak]: 15 * 1000 * 60,
  [Cycle.Work]: 25 * 1000 * 60,
};

// For testing
// export const cycleLengths: Record<Cycle, number> = {
//   [Cycle.Break]: 5 * 1000, // * 60,
//   [Cycle.LongBreak]: 7 * 1000, // * 60,
//   [Cycle.Work]: 10 * 1000, // * 60,
// };

export enum TimerStatus {
  Ready,
  Running,
  Paused,
}

interface IPomodoroAtom {
  cycle: Cycle;
  completedCycles: number;
  status: TimerStatus;
  timeRemaining: number;

  resumeTime?: number;
  resumeTimeRemaining?: number;
}

export const pomodoroAtom = atom<IPomodoroAtom>({
  cycle: Cycle.Work,
  timeRemaining: cycleLengths[Cycle.Work],
  completedCycles: 0,
  status: TimerStatus.Ready,
});

export function usePomodoroState() {
  return useAtom(pomodoroAtom);
}

export function usePomodoro() {
  return useAtomValue(pomodoroAtom);
}

export function useSetPomodoro() {
  return useSetAtom(pomodoroAtom);
}
