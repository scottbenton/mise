import { Button, Typography } from "@mui/material";
import { PageLayout } from "../../components/layout/PageLayout";
import { loginWithGoogle } from "../../lib/auth";

export function LoginPage() {
  return (
    <PageLayout centered>
      <Typography variant={"h6"} component={"h1"}>
        Login Page
      </Typography>
      <Button
        variant={"outlined"}
        sx={{ mt: 3 }}
        onClick={() => loginWithGoogle()}
      >
        Login with Google
      </Button>
    </PageLayout>
  );
}
