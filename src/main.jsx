import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthForm from "./jsx/components/AuthForm.jsx";
import NewPost from "./jsx/components/newPost.jsx";
import ForgotPsswd from "./jsx/components/ForgotPsswd.jsx";
import RestartPsswd from "./jsx/components/RestartPsswd.jsx";
import SentMsg from "./jsx/components/SentMsg.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/new-post", element: <NewPost /> },
  { path: "/forgot-psswd", element: <ForgotPsswd /> },
  { path: "/restart-psswd/:id", element: <RestartPsswd /> },
  { path: "/successfull-mail", element: <SentMsg /> },
]);
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
