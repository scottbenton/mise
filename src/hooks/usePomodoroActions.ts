import {
  TimerStatus,
  cycleLengths,
  Cycle,
  useSetPomodoro,
} from "atoms/pomodoroAtom";
import { useCallback } from "react";

export function usePomodoroActions() {
  const setPomodoroState = useSetPomodoro();

  const handlePause = useCallback(() => {
    setPomodoroState((prev) => ({
      ...prev,
      status: TimerStatus.Paused,
      resumeTime: undefined,
      resumeTimeRemaining: undefined,
    }));
  }, [setPomodoroState]);

  const handleStartOrResume = useCallback(() => {
    setPomodoroState((prev) => {
      const currentTime = new Date().getTime();
      return {
        ...prev,
        status: TimerStatus.Running,
        resumeTime: currentTime,
        resumeTimeRemaining: prev.timeRemaining,
      };
    });
  }, [setPomodoroState]);

  const handleRestart = useCallback(() => {
    setPomodoroState((prev) => ({
      ...prev,
      status: TimerStatus.Ready,
      timeRemaining: cycleLengths[prev.cycle],
      resumeTime: undefined,
      resumeTimeRemaining: undefined,
    }));
  }, [setPomodoroState]);

  const handleReset = useCallback(() => {
    setPomodoroState(() => ({
      cycle: Cycle.Work,
      timeRemaining: cycleLengths[Cycle.Work],
      completedCycles: 0,
      status: TimerStatus.Ready,
    }));
  }, [setPomodoroState]);

  return {
    handleStartOrResume,
    handlePause,
    handleRestart,
    handleReset,
  };
}
