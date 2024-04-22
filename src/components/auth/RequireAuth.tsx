import { useNavigate } from "react-router-dom";
import { useAuth } from "../../atoms/authAtom";
import { PropsWithChildren, useEffect } from "react";
import { loginPath } from "../../routes";

export function RequireAuth(props: PropsWithChildren) {
  const { children } = props;
  const redirect = useNavigate();
  const { uid, loading } = useAuth();

  useEffect(() => {
    if (!loading && !uid) {
      redirect(loginPath);
    }
  }, [loading, uid, redirect]);

  if (loading) {
    return <></>;
  }

  if (!uid) {
    return <></>;
  }

  return <>{children}</>;
}
