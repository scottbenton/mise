import { Box, ButtonBase, SxProps, Typography } from "@mui/material";
import { LinkComponent } from "../LinkComponent";
import { useRef } from "react";

export interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
  onMouseEnter?: () => void;
  onHover?: () => void;
  onClick?: () => void;
  sx?: SxProps;
}

export function NavItem(props: NavItemProps) {
  const { label, icon, href, active, sx, onMouseEnter, onHover, onClick } =
    props;

  const isHoveringRef = useRef(false);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    onMouseEnter && onMouseEnter();

    if (onHover) {
      setTimeout(() => {
        if (isHoveringRef.current) {
          onHover();
        }
      }, 500);
    }
  };

  return (
    <ButtonBase
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => (isHoveringRef.current = false)}
      onClick={() => {
        onClick && onClick();
        isHoveringRef.current = false;
      }}
      disableRipple
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          "&:hover>div": {
            bgcolor: active ? "primary.dark" : undefined,
          },
          "&:hover>span": {
            color: "primary.main",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      LinkComponent={LinkComponent}
      href={href}
    >
      <Box
        sx={(theme) => ({
          borderRadius: 999,
          bgcolor: active ? "primary.main" : "transparent",
          color: active ? "primary.contrastText" : "",
          width: 56,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.shorter,
          }),
        })}
      >
        {icon}
      </Box>
      <Typography
        variant={"caption"}
        sx={[
          active
            ? { fontWeight: "600", color: "primary.main" }
            : { color: "text.primary" },
          (theme) => ({
            transition: theme.transitions.create(["color", "fontWeight"], {
              duration: theme.transitions.duration.shorter,
            }),
          }),
        ]}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}
