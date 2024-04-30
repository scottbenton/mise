import { Typography } from "@mui/material";
import { Cycle, usePomodoro } from "atoms/pomodoroAtom";
import { motion } from "framer-motion";

interface TimerCycleLabelProps {
  fullscreen?: boolean;
}

export function TimerCycleLabel(props: TimerCycleLabelProps) {
  const { fullscreen } = props;

  const { cycle } = usePomodoro();

  return (
    <Typography
      variant={fullscreen ? "h4" : "h5"}
      component={motion.p}
      layoutId={"timer-cycle-label"}
    >
      {cycle === Cycle.Work && "Work"}
      {cycle === Cycle.Break && "Break"}
      {cycle === Cycle.LongBreak && "Long Break"}
    </Typography>
  );
}
