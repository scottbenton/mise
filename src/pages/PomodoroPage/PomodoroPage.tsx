import { Box, IconButton, Typography } from "@mui/material";
import { PageLayout } from "components/layout/PageLayout";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import FullscreenIcon from "@mui/icons-material/FullscreenExit";
import { MotionComponent } from "components/MotionComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import { DrawerToggle } from "components/layout/DrawerToggle";
import { PomodoroSettings } from "./PomodoroSettings";
import ThemeIcon from "@mui/icons-material/FormatPaint";
import { ThemeChange } from "components/layout/ThemeChange";
import { Pomodoro } from "components/pomodoro/Pomodoro";

export default function PomodoroPage() {
  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        layoutId={"pomodoro-container"}
        sx={(theme) => ({
          minHeight: "100dvh",
          width: "100%",
          p: 2,
          display: "flex",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
        })}
      >
        <PageLayout>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography variant={"h6"} component={"h1"}>
              Pomodoro
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              {"wakeLock" in navigator && (
                <DrawerToggle
                  icon={<SettingsIcon />}
                  drawerContent={<PomodoroSettings />}
                  title={"Pomodoro Settings"}
                />
              )}
              <DrawerToggle
                icon={<ThemeIcon />}
                drawerContent={<ThemeChange />}
                title={"Change your Theme"}
              />
              <IconButton
                component={MotionComponent}
                motionComponent={Link}
                layoutId={"pomodoro-fullscreen-icon"}
                to={"/"}
                color={"inherit"}
              >
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            flexGrow={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Pomodoro fullscreen />
            {/* <Pomodoro /> */}
          </Box>
        </PageLayout>
      </Box>
    </AnimatePresence>
  );
}
