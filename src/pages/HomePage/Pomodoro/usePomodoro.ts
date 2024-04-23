import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTimer, Timer } from "react-use-precision-timer";
import { usePomodoroAudio } from "./usePomodoroAudio";

export enum CURRENT_CYCLE {
  WORK,
  BREAK,
}

interface UsePomdoroReturnType {
  currentCycle: CURRENT_CYCLE;
  timer: Timer;
  hasStarted: boolean;
  setHasStarted: Dispatch<SetStateAction<boolean>>;
}

export function usePomodoro(): UsePomdoroReturnType {
  const playAudio = usePomodoroAudio();

  const [currentCycle, setCurrentCycle] = useState(CURRENT_CYCLE.WORK);
  const [hasStarted, setHasStarted] = useState(false);

  const onCycleEnd = useCallback(() => {
    playAudio();
    if (currentCycle === CURRENT_CYCLE.WORK) {
      setCurrentCycle(CURRENT_CYCLE.BREAK);
    } else if (currentCycle === CURRENT_CYCLE.BREAK) {
      setCurrentCycle(CURRENT_CYCLE.WORK);
    }
  }, [currentCycle, playAudio]);

  const timer = useTimer(
    {
      delay: (currentCycle === CURRENT_CYCLE.WORK ? 25 : 5) * 60 * 1000 + 20,
      // delay: (currentCycle === CURRENT_CYCLE.WORK ? 25 : 5) * 1000 + 20,
      runOnce: true,
    },
    onCycleEnd
  );

  const isTimerStopped = timer.isStopped();
  useEffect(() => {
    if (isTimerStopped) {
      timer.start();
      if (!hasStarted) {
        timer.pause();
      }
    }
  }, [currentCycle, hasStarted, isTimerStopped, timer]);

  const [, setRerenderTime] = useState(new Date());
  const isTimerRunning = timer.isRunning();
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setRerenderTime(new Date());
      }, 200);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning]);

  return {
    currentCycle,
    timer,
    hasStarted,
    setHasStarted,
  };
}
