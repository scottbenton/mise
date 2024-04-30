import { useTimerTick } from "hooks/useTimerTick";
import { TimerDisplay } from "./TimerDisplay";
import { TimerCycleLabel } from "./TimerCycleLabel";
import { TimerActions } from "./TimerActions";

interface PomodoroProps {
  fullscreen?: boolean;
}

export function Pomodoro(props: PomodoroProps) {
  const { fullscreen } = props;

  useTimerTick();

  return (
    <>
      <TimerCycleLabel fullscreen={fullscreen} />
      <TimerDisplay fullscreen={fullscreen} />
      <TimerActions fullscreen={fullscreen} />
    </>
  );
}
