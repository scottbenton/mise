import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { useSyncAuth } from "./lib/auth";

const router = createBrowserRouter(routes);

function App() {
  useSyncAuth();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
