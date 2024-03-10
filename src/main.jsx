import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthForm from "./jsx/components/AuthForm.jsx";
import Dashboard from "./jsx/components/Dashboard.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/dashboard", element: <Dashboard /> },
]);
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
