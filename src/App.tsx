import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { useSyncAuth } from "./lib/auth";
import AppLayout from "components/layout/AppLayout";

const router = createBrowserRouter(routes);

function App() {
  useSyncAuth();

  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
}

export default App;
