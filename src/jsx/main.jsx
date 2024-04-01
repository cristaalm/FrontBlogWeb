import React, { useContext, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./Elements/Wrapper";
import { IntlProvider } from "react-intl";
import App from "./App.jsx";
import AuthForm from "./Login/AuthForm.jsx";
import NewPost from "./Dashboard/Post/newPost.jsx";
import ForgotPsswd from "./Login/ForgotPsswd.jsx";
import RestartPsswd from "./Login/RestartPsswd.jsx";
import SentMsg from "./Login/SentMsg.jsx";
import PreviewPost from "./Dashboard/Post/PreviewPost.jsx";
import CRUD from "./Dashboard/Post/CRUD.jsx";
import { Context } from "./Elements/Wrapper.jsx";

import messagesEn from "../lang/en.json";
import messagesEs from "../lang/es.json";
import Dashboard from "./Dashboard/Dashboard.jsx";

const messages = {
  en: messagesEn,
  es: messagesEs,
};

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/new-post", element: <NewPost /> },
  { path: "/forgot-psswd", element: <ForgotPsswd /> },
  { path: "/restart-psswd/:id", element: <RestartPsswd /> },
  { path: "/successfull-mail", element: <SentMsg /> },
  { path: "/preview-post", element: <PreviewPost /> },
  { path: "/crud", element: <CRUD /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

const AppWithIntl = () => {
  const context = useContext(Context);
  // console.log(local);
  // useEffect(() => {
  //   if (selectedLocale === "es-MX") {
  //     setSelectedLocale("es");
  //   }
  //   console.log(selectedLocale);
  // }, [selectedLocale]);

  return (
    <Wrapper>
      <RouterProvider router={router}></RouterProvider>
    </Wrapper>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithIntl />
  </React.StrictMode>
);
