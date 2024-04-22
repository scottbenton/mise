import { RouteObject } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./components/auth/RequireAuth";
import { RequireUnAuth } from "./components/auth/RequireUnAuth";

export const loginPath = "/login";
export const homePath = "/";

export const routes: RouteObject[] = [
  {
    Component: AppLayout,
    children: [
      {
        Component: RequireAuth,
        children: [
          {
            path: homePath,
            Component: HomePage,
          },
        ],
      },
      {
        Component: RequireUnAuth,
        children: [
          {
            path: loginPath,
            Component: LoginPage,
          },
        ],
      },
    ],
  },
];
