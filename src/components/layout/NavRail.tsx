import { Box } from "@mui/material";
import { useAuth } from "../../atoms/authAtom";
import { NavItem } from "./NavItem";
import AuthIcon from "@mui/icons-material/AccountCircle";
import ThemeIcon from "@mui/icons-material/FormatPaint";
import { DrawerToggle } from "./DrawerToggle";
import { ThemeChange } from "./ThemeChange";
import { homePath, loginPath } from "routes";
import HomeIcon from "@mui/icons-material/Home";

export function NavRail() {
  const { uid } = useAuth();

  return (
    <Box
      sx={(theme) => ({
        width: theme.spacing(10),
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      <Box
        component={"nav"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "text.secondary",
        }}
      >
        {uid ? (
          <>
            <NavItem
              label="Home"
              icon={<HomeIcon />}
              href={homePath}
              active={true}
            />
          </>
        ) : (
          <>
            <NavItem
              label="Log In"
              icon={<AuthIcon />}
              href={loginPath}
              active={true}
            />
          </>
        )}
      </Box>
      <DrawerToggle
        icon={<ThemeIcon />}
        drawerContent={<ThemeChange />}
        title={"Change Theme"}
      />
    </Box>
  );
}
