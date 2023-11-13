import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
