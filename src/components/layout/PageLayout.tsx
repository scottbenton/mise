import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export function PageLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <Container
      maxWidth={"lg"}
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
