import { THEME_COLORS, THEME_TYPES } from "./themes";
import { atomWithStorage } from "jotai/utils";

interface IThemeAtom {
  color: THEME_COLORS;
  type: THEME_TYPES;
}

export const themeAtom = atomWithStorage<IThemeAtom>("theme", {
  color: THEME_COLORS.VIOLET,
  type: THEME_TYPES.LIGHT,
});
