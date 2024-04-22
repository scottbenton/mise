import { Box, LinearProgress } from "@mui/material";
import { useAuth } from "../../atoms/authAtom";
import { useAtomValue } from "jotai";
import { themeAtom } from "providers/MuiThemeProvider/themeAtom";
import { THEME_TYPES } from "providers/MuiThemeProvider/themes";
import { PropsWithChildren } from "react";

export default function AppLayout(props: PropsWithChildren) {
  const { children } = props;

  const { loading } = useAuth();
  const { type } = useAtomValue(themeAtom);

  if (loading) {
    return <LinearProgress />;
  }
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={"stretch"}
      minHeight={"100dvh"}
      maxHeight={"100dvh"}
      bgcolor={
        type === THEME_TYPES.BLACK ? "background.default" : "primary.dark"
      }
      overflow={"hidden"}
    >
      {/* <Box display={{ xs: "none", sm: "block" }}>
        <NavRail />
      </Box> */}
      <Box flexGrow={1} overflow={"auto"}>
        {children}
      </Box>
      {/* <Box display={{ xs: "block", sm: "none" }}>BottomNav</Box> */}
    </Box>
  );
}
