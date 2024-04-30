import { RouteObject } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { RequireAuth } from "./components/auth/RequireAuth";
import { RequireUnAuth } from "./components/auth/RequireUnAuth";
import PomodoroPage from "pages/PomodoroPage/PomodoroPage";

export const loginPath = "/login";
export const homePath = "/";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/pomodoro",
    element: (
      <RequireAuth>
        <PomodoroPage />
      </RequireAuth>
    ),
  },
  {
    path: "login",
    element: (
      <RequireUnAuth>
        <LoginPage />
      </RequireUnAuth>
    ),
  },
];
