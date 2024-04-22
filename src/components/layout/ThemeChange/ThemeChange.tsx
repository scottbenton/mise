import { Typography, Box } from "@mui/material";
import { ThemeBox } from "./ThemeBox";
import {
  THEME_COLORS,
  THEME_TYPES,
  themeColors,
  themeTypes,
} from "providers/MuiThemeProvider/themes";
import { useAtom } from "jotai";
import { themeAtom } from "providers/MuiThemeProvider/themeAtom";

export function ThemeChange() {
  const [theme, setTheme] = useAtom(themeAtom);
  const { type, color } = theme;
  return (
    <Box>
      <Typography variant={"h6"}>Theme Types</Typography>

      <Box display={"flex"} flexWrap={"wrap"}>
        {Object.keys(themeTypes).map((typeKey, index) => {
          const typedTypeKey = typeKey as THEME_TYPES;

          return (
            <ThemeBox
              key={index}
              color={themeTypes[typedTypeKey].backgroundColor}
              name={themeTypes[typedTypeKey].name}
              selected={typeKey === type}
              onClick={() =>
                setTheme((prevTheme) => ({ ...prevTheme, type: typedTypeKey }))
              }
            />
          );
        })}
      </Box>
      <Box marginTop={4}>
        <Typography variant={"h6"}>Theme Colors</Typography>

        <Box display={"flex"} flexWrap={"wrap"}>
          {Object.keys(themeColors).map((colorKey, index) => {
            const typedColor = colorKey as THEME_COLORS;

            return (
              <ThemeBox
                key={index}
                color={themeColors[typedColor].mainValue}
                name={themeColors[typedColor].name}
                selected={colorKey === color}
                onClick={() =>
                  setTheme((prevTheme) => ({
                    ...prevTheme,
                    color: typedColor,
                  }))
                }
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
