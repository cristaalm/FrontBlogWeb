import React, { useContext, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./Elements/Wrapper";
import { IntlProvider } from "react-intl";
import App from "./App.jsx";
import AuthForm from "./Login/AuthForm.jsx";
import NewPost from "./components/newPost1.jsx";
import ForgotPsswd from "./Login/ForgotPsswd.jsx";
import RestartPsswd from "./Login/RestartPsswd.jsx";
import SentMsg from "./Login/SentMsg.jsx";
import PreviewPost from "./Dashboard/Post/PreviewPost.jsx";
import CRUD from "./Dashboard/Post/CRUD.jsx";
import Test from "./testG.jsx";
import Side from "./Elements/SideNavBar.jsx";
import { Context } from "./Elements/Wrapper.jsx";

import messagesEn from "../lang/en.json";
import messagesEs from "../lang/es.json";
import Dashboard from "./Dashboard/DashboardFinal.jsx";

import "../css/index.css";

const messages = {
  en: messagesEn,
  es: messagesEs,
};

const router = createBrowserRouter([
  // General
  { path: "/", element: <App /> },
  { path: "/test", element: <Test /> },
  { path: "/side", element: <Side /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/dashboard", element: <Dashboard /> },
  // Login - Inicio de Sesión
  { path: "/forgot-psswd", element: <ForgotPsswd /> },
  { path: "/restart-psswd/:id", element: <RestartPsswd /> },
  { path: "/successfull-mail", element: <SentMsg /> },
  // NewPost - Entradas
  {
    path: "/post",
    element: <CRUD />,
    children: [
      { index: true, element: <CRUD /> },
      { path: "add", element: <NewPost /> },
      { path: "all", element: <CRUD /> },
      { path: "preview", element: <PreviewPost /> },
      { path: "categories", element: <PreviewPost /> },
    ],
  },
  // Users - Usuarios
  { path: "/users", element: <ForgotPsswd /> },

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
