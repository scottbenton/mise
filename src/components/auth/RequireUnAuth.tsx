import { useNavigate } from "react-router-dom";
import { useAuth } from "../../atoms/authAtom";
import { PropsWithChildren, useEffect } from "react";
import { homePath } from "../../routes";

export function RequireUnAuth(props: PropsWithChildren) {
  const { children } = props;

  const redirect = useNavigate();
  const { uid, loading } = useAuth();

  useEffect(() => {
    if (!loading && uid) {
      redirect(homePath);
    }
  }, [loading, uid, redirect]);

  if (loading) {
    return <></>;
  }

  if (uid) {
    return <></>;
  }

  return <>{children}</>;
}
