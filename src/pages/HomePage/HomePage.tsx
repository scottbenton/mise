import { Box, Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import { PageLayout } from "../../components/layout/PageLayout";
import { useAuth } from "atoms/authAtom";
import { TodoList } from "./TodoList";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Schedule } from "./Schedule";

import { DrawerToggle } from "../../components/layout/DrawerToggle";
import { ThemeChange } from "../../components/layout/ThemeChange";
import ThemeIcon from "@mui/icons-material/FormatPaint";
import { Pomodoro } from "components/pomodoro/Pomodoro";
import { useDateState } from "atoms/dateAtom";
import { motion } from "framer-motion";
import { MotionComponent } from "components/MotionComponent";
import { Link } from "react-router-dom";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export default function HomePage() {
  const { username } = useAuth();

  const name = username ? username.split(" ")[0] : undefined;

  const [date, setDate] = useDateState();

  return (
    <PageLayout>
      <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
        <Typography
          variant={"h5"}
          component={"h1"}
          textTransform={"capitalize"}
        >
          Welcome Back{name ? `, ${name}` : ""}!
        </Typography>
        <Box color={"primary.main"}>
          <DrawerToggle
            icon={<ThemeIcon />}
            drawerContent={<ThemeChange />}
            title={"Change your Theme"}
          />
        </Box>
      </Stack>
      <Grid container spacing={4} sx={{ mt: 0 }}>
        <Grid item xs={12}>
          <DatePicker
            label={"Date"}
            value={dayjs(date)}
            onChange={(value) => setDate(value?.toDate())}
          />
        </Grid>
        {date && (
          <>
            <Grid item xs={12} md={8}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant={"h6"} component={"h2"}>
                    Daily Schedule
                  </Typography>
                  <Schedule date={date} />
                </Box>
                {/* <Box>
                <Typography variant={"h6"} component={"h2"}>
                Journal
                </Typography>
              </Box> */}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant={"h6"} component={"h2"}>
                    Pomodoro
                  </Typography>

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
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        width={"100%"}
                      >
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
                      <Pomodoro />
                    </Card>
                  </Box>
                </Box>
                <Box>
                  <Typography variant={"h6"} component={"h2"}>
                    Daily Tasks
                  </Typography>
                  <TodoList date={date} />
                </Box>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </PageLayout>
  );
}
