import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { CURRENT_CYCLE, usePomodoro } from "./usePomodoro";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ResetIcon from "@mui/icons-material/Replay";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MotionComponent } from "components/MotionComponent";

export function Pomodoro() {
  const { currentCycle, timer, setHasStarted } = usePomodoro();

  const timeRemaining = timer.getRemainingTime();
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining - minutes * 60000) / 1000);
  const paddedSeconds = (seconds + "").length === 1 ? "0" + seconds : seconds;

  return (
    <Box>
      <Card
        variant={"outlined"}
        component={motion.div}
        layoutId={"pomodoro-container"}
        sx={(theme) => ({
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          maxWidth: "sm",
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
          <IconButton
            component={MotionComponent}
            motionComponent={Link}
            to={"/pomodoro"}
            layoutId={"pomodoro-fullscreen-icon"}
            href={"/pomodoro"}
            color={"inherit"}
          >
            <FullscreenIcon />
          </IconButton>
        </Box>
        <Typography
          variant={"h5"}
          component={motion.h2}
          layoutId={"pomodoro-cycle-text"}
        >
          {currentCycle === CURRENT_CYCLE.BREAK && "Break"}
          {currentCycle === CURRENT_CYCLE.WORK && "Work"}
        </Typography>
        <Typography
          variant={"h3"}
          fontFamily={(theme) => theme.fontFamilies.mono}
        >
          {minutes}:{paddedSeconds}
        </Typography>
        <Stack spacing={0.5} direction={"row"}>
          {timer.isPaused() && (
            <>
              <IconButton
                onClick={() => {
                  setHasStarted(true);
                  timer.resume();
                }}
                color={"inherit"}
              >
                <PlayIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setHasStarted(false);
                  timer.stop();
                }}
                color={"inherit"}
              >
                <ResetIcon />
              </IconButton>
            </>
          )}
          {timer.isRunning() && (
            <IconButton onClick={() => timer.pause()} color={"inherit"}>
              <PauseIcon />
            </IconButton>
          )}
        </Stack>
      </Card>
    </Box>
  );
}
