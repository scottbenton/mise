import { Box, LinearProgress } from "@mui/material";
import { useAuth } from "../../atoms/authAtom";
import { PropsWithChildren } from "react";

export default function AppLayout(props: PropsWithChildren) {
  const { children } = props;

  const { loading } = useAuth();

  if (loading) {
    return <LinearProgress />;
  }
  return (
    <Box minHeight={"100dvh"} bgcolor={"background.paper"}>
      {children}
    </Box>
  );
}
