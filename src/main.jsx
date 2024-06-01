import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/Router.jsx";
import { Toaster } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster reverseOrder={true} />
    </HelmetProvider>
  </React.StrictMode>
);
