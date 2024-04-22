import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../atoms/authAtom";
import { useEffect } from "react";
import { loginPath } from "../../routes";

export function RequireAuth() {
  const redirect = useNavigate();
  const { uid, loading } = useAuth();

  useEffect(() => {
    if (!loading && !uid) {
      redirect(loginPath);
    }
  }, [loading, uid, redirect]);

  if (loading) {
    return null;
  }

  if (!uid) {
    return null;
  }

  return <Outlet />;
}
