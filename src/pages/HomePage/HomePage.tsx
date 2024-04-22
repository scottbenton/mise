import { Box, Grid, Stack, Typography } from "@mui/material";
import { PageLayout } from "../../components/layout/PageLayout";
import { useAuth } from "atoms/authAtom";
import { TodoList } from "./TodoList";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { constructDateString } from "functions/constructDateString";
import { Schedule } from "./Schedule";

export default function HomePage() {
  const { username } = useAuth();

  const name = username ? username.split(" ")[0] : undefined;

  const [date, setDate] = useState<dayjs.Dayjs | null>(
    dayjs(constructDateString(new Date()))
  );

  return (
    <PageLayout>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent={"space-between"}
      >
        <Typography variant={"h5"} component={"h1"}>
          Welcome Back{name ? `, ${name}` : ""}!
        </Typography>
        <DatePicker
          label={"Date"}
          value={date}
          onChange={(value) => setDate(value)}
        />
      </Stack>
      {date && (
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              <Box>
                <Typography variant={"h6"} component={"h2"}>
                  Schedule
                </Typography>
                <Schedule date={date.toDate()} />
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
              {/* <Box>
                <Typography variant={"h6"} component={"h2"}>
                  Pomodoro
                </Typography>
              </Box> */}
              <Box>
                <Typography variant={"h6"} component={"h2"}>
                  Todo List
                </Typography>
                <TodoList date={date.toDate()} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      )}
    </PageLayout>
  );
}
