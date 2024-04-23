import { Container, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export function PageLayout(props: PropsWithChildren) {
  const { children } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth={"lg"}
      disableGutters={isMobile}
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        py: 2,
      }}
    >
      {children}
    </Container>
  );
}
