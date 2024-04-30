import { Typography } from "@mui/material";
import { usePomodoro } from "atoms/pomodoroAtom";
import { motion } from "framer-motion";
import { useIsMobile } from "hooks/useIsMobile";

export interface TimerDisplayProps {
  fullscreen?: boolean;
}

export function TimerDisplay(props: TimerDisplayProps) {
  const { fullscreen } = props;

  const { timeRemaining } = usePomodoro();

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining - minutes * 60000) / 1000);
  const paddedSeconds = (seconds + "").length === 1 ? "0" + seconds : seconds;

  const isMobile = useIsMobile();

  return (
    <Typography
      variant={fullscreen ? (isMobile ? "h2" : "h1") : "h3"}
      component={motion.p}
      layoutId={"timer-display"}
      fontFamily={(theme) => theme.fontFamilies.mono}
    >
      {minutes}:{paddedSeconds}
    </Typography>
  );
}
