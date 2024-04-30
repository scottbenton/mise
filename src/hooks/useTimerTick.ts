import { useEffect, useRef } from "react";
import { atom, useAtomValue } from "jotai";
import {
  Cycle,
  cycleLengths,
  pomodoroAtom,
  TimerStatus,
  useSetPomodoro,
} from "atoms/pomodoroAtom";
import { usePomodoroAudio } from "./usePomodoroAudio";
import { useWakelock } from "pages/HomePage/Pomodoro/useWakelock";

const resumeTimeAtom = atom((get) => {
  const state = get(pomodoroAtom);
  return {
    status: state.status,
    resumeTime: state.resumeTime,
    resumeTimeRemaining: state.resumeTimeRemaining,
  };
});

export function useTimerTick() {
  const playAudio = usePomodoroAudio();

  const { resumeTime, resumeTimeRemaining, status } =
    useAtomValue(resumeTimeAtom);

  useWakelock(status === TimerStatus.Running);

  const setPomodoro = useSetPomodoro();

  const remainingTime = useRef<number | undefined>();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === TimerStatus.Running && resumeTime && resumeTimeRemaining) {
      const tick = () => {
        const currentTime = new Date().getTime();
        let timeDifference = 0;

        timeDifference = currentTime - (resumeTime ?? 0);

        const timeLeft = (resumeTimeRemaining ?? 0) - timeDifference;

        remainingTime.current = timeLeft;

        if (timeLeft >= 0) {
          setPomodoro((prev) => ({
            ...prev,
            timeRemaining: timeLeft,
          }));
        } else {
          playAudio();
          setPomodoro((prev) => {
            let newCycle: Cycle = Cycle.Work;

            if (prev.cycle === Cycle.Work) {
              newCycle =
                prev.completedCycles + 1 === 4 ? Cycle.LongBreak : Cycle.Break;
            }

            let completedCycles = prev.completedCycles;
            if (newCycle === Cycle.Break) {
              completedCycles += 1;
            } else if (newCycle === Cycle.LongBreak) {
              completedCycles += 1;
            } else if (prev.cycle === Cycle.LongBreak) {
              completedCycles = 0;
            }

            return {
              cycle: newCycle,
              completedCycles: completedCycles,
              resumeTime: new Date().getTime(),
              resumeTimeRemaining: cycleLengths[newCycle],
              status: TimerStatus.Running,
              timeRemaining: cycleLengths[newCycle],
            };
          });
        }
      };

      interval = setInterval(tick, 200);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status, resumeTime, resumeTimeRemaining, setPomodoro, playAudio]);
}
