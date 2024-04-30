import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { TimerStatus, usePomodoro } from "atoms/pomodoroAtom";
import { usePomodoroActions } from "hooks/usePomodoroActions";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartIcon from "@mui/icons-material/Replay";
import UncompletedCycleIcon from "@mui/icons-material/RadioButtonUnchecked";
import CompletedCycleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

interface TimerActionsProps {
  fullscreen?: boolean;
}

export function TimerActions(props: TimerActionsProps) {
  const { fullscreen } = props;

  const { completedCycles, status } = usePomodoro();
  const { handlePause, handleRestart, handleReset, handleStartOrResume } =
    usePomodoroActions();

  return (
    <Stack
      spacing={2}
      alignItems={"center"}
      mt={fullscreen ? 4 : 1}
      component={motion.div}
      layoutId={"pomodoro-actions"}
    >
      <Stack spacing={0.5} direction={"row"}>
        {status === TimerStatus.Paused && (
          <>
            <IconButton onClick={handleStartOrResume} color={"inherit"}>
              <PlayIcon />
            </IconButton>
            <IconButton onClick={handleRestart} color={"inherit"}>
              <RestartIcon />
            </IconButton>
          </>
        )}
        {status === TimerStatus.Running && (
          <IconButton onClick={handlePause} color={"inherit"}>
            <PauseIcon />
          </IconButton>
        )}
        {status === TimerStatus.Ready && (
          <IconButton onClick={handleStartOrResume} color={"inherit"}>
            <PlayIcon />
          </IconButton>
        )}
      </Stack>
      {fullscreen && (
        <>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"overline"}>Completed Cycles</Typography>
            <Stack spacing={0.25} direction={"row"}>
              {new Array(completedCycles).fill(0).map((_, index) => (
                <CompletedCycleIcon fontSize="small" key={index} />
              ))}
              {new Array(4 - completedCycles).fill(0).map((_, index) => (
                <UncompletedCycleIcon fontSize={"small"} key={index} />
              ))}
            </Stack>
          </Box>
          <Button onClick={handleReset} color={"inherit"} variant={"outlined"}>
            Reset Timer
          </Button>
        </>
      )}
    </Stack>
  );
}
