import { PropsWithChildren } from "react";
import { MuiThemeProvider } from "./MuiThemeProvider";
import { SnackbarProvider } from "./SnackbarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function AppProviders(props: PropsWithChildren) {
  const { children } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiThemeProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  );
}
