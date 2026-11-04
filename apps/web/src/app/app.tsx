import { RouterProvider } from "@tanstack/react-router";

import "./styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

import { router } from "./router";

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
