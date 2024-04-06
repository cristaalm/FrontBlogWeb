import React, { useContext, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./Elements/Wrapper.jsx";
import { IntlProvider } from "react-intl";
import App from "./App.jsx";
import AuthForm from "./Login/AuthForm.jsx";
import NewPost from "./Dashboard/Post/newPost.jsx";
import ForgotPsswd from "./Login/ForgotPsswd.jsx";
import RestartPsswd from "./Login/RestartPsswd.jsx";
import SentMsg from "./Login/SentMsg.jsx";
import PreviewPost from "./Dashboard/Post/Preview.jsx";
import CRUD from "./Dashboard/Post/CRUD.jsx";
import Usuarios from "./Dashboard/Users/usuarios.jsx";
import Categorias from "./Dashboard/Categories/categorias.jsx";
// import Test from "./testG.jsx";
import Side from "./Elements/SideNavBar.jsx";

// Home
import Home from "./Index/home.jsx";

import { Context } from "./Elements/Wrapper.jsx";

import messagesEn from "../lang/en.json";
import messagesEs from "../lang/es.json";
import Dashboard from "./Dashboard/DashboardFinal.jsx";

// import "../css/index.css";

const messages = {
  en: messagesEn,
  es: messagesEs,
};

const router = createBrowserRouter([
  // General
  { path: "/welcome", element: <Home /> },
  { path: "/", element: <App /> },
  // { path: "/test", element: <Test /> },
  { path: "/side", element: <Side /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/dashboard", element: <Dashboard /> },
  // Login - Inicio de Sesión
  { path: "/forgot-psswd", element: <ForgotPsswd /> },
  { path: "/restart-psswd/:id", element: <RestartPsswd /> },
  { path: "/successfull-mail", element: <SentMsg /> },
  // { path: "/preview", element: <PreviewPost /> },
  // NewPost - Entradas
  {
    path: "/post",
    // element: <CRUD />,
    children: [
      { index: true, element: <CRUD /> },
      { path: "add", element: <NewPost /> },
      { path: "all", element: <CRUD /> },
      { path: "preview", element: <PreviewPost /> },
      // { path: "categories", element: <PreviewPost /> },
    ],
  },
  // Categories - Categorías
  { path: "/categories", element: <Categorias /> },
  // Users - Usuarios
  { path: "/users", element: <Usuarios /> },

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
