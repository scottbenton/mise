import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeTypes, themeColors } from "./themes";
import { PropsWithChildren } from "react";
import { themeAtom } from "./themeAtom";
import { useAtom } from "jotai";

declare module "@mui/material/styles" {
  interface Theme {
    fontFamilies: {
      mono: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    fontFamilies: {
      mono: string;
    };
  }
}

export function MuiThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  const [themeSettings] = useAtom(themeAtom);
  const { type, color } = themeSettings;

  const theme = createTheme({
    fontFamilies: {
      mono: ["Major Mono Display", "monospace"].join(","),
    },
    typography: {
      fontFamily: ["Plus Jakarta Sans Variable", "Arial", "sans-serif"].join(
        ","
      ),
    },
    palette: {
      mode: themeTypes[type].type as "light" | "dark",
      primary: {
        light: themeColors[color].lightValue,
        main: themeColors[color].mainValue,
        dark: themeColors[color].darkValue,
      },
      background: {
        default: themeTypes[type].backgroundColor,
        paper: themeTypes[type].paperColor,
      },
    },
    shape: {
      borderRadius: 16,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
