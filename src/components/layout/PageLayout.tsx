import { Box, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { DrawerToggle } from "./DrawerToggle";
import { ThemeChange } from "./ThemeChange";
import ThemeIcon from "@mui/icons-material/FormatPaint";

export interface PageLayoutProps {
  centered?: boolean;
}

export function PageLayout(props: PropsWithChildren<PageLayoutProps>) {
  const { centered, children } = props;

  return (
    <Container
      maxWidth={"lg"}
      sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        color={"primary.contrastText"}
        py={1}
      >
        <DrawerToggle
          icon={<ThemeIcon />}
          drawerContent={<ThemeChange />}
          title={"Change Theme"}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={centered ? "center" : "flex-start"}
        flexGrow={1}
      >
        <Paper
          component={motion.div}
          layoutId={"page-container"}
          elevation={0}
          sx={[
            { p: 2 },
            centered
              ? {
                  width: "100%",
                  maxWidth: "sm",
                }
              : {
                  width: "100%",
                  flexGrow: 1,
                  borderRadius: 1.5,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  maxWidth: "lg",
                },
          ]}
        >
          {children}
        </Paper>
      </Box>
    </Container>
  );
}
