import React, { useContext,useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./jsx/components/elements/Wrapper"; // Importa el componente Wrapper
import { IntlProvider } from "react-intl"; // Importa IntlProvider
import App from "./App.jsx";
import AuthForm from "./jsx/components/AuthForm.jsx";
import NewPost from "./jsx/components/newPost.jsx";
import ForgotPsswd from "./jsx/components/ForgotPsswd.jsx";
import RestartPsswd from "./jsx/components/RestartPsswd.jsx";
import SentMsg from "./jsx/components/SentMsg.jsx";
import PreviewPost from "./jsx/components/PreviewPost.jsx";
import { Context } from "./jsx/components/elements/Wrapper.jsx";
// Define los mensajes para los idiomas en tu aplicación
import messagesEn from "./lang/en.json";
import messagesEs from "./lang/es.json";

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
]);

const AppWithIntl = () => {
  const [selectedLocale, setSelectedLocale] = useState('en');
  const context = useContext(Context);
  return (
    <Wrapper>
      <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <RouterProvider router={router}></RouterProvider>
      </IntlProvider>
    </Wrapper>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithIntl />
  </React.StrictMode>
);