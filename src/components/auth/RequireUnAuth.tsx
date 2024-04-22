import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../atoms/authAtom";
import { useEffect } from "react";
import { homePath } from "../../routes";

export function RequireUnAuth() {
  const redirect = useNavigate();
  const { uid, loading } = useAuth();

  useEffect(() => {
    if (!loading && uid) {
      redirect(homePath);
    }
  }, [loading, uid, redirect]);

  if (loading) {
    return null;
  }

  if (uid) {
    return null;
  }

  return <Outlet />;
}
