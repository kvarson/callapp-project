import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "../src/routes/routes.jsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>
);

// root.render(
//   <>
//     <RouterProvider router={router} />
//   </>
// );
