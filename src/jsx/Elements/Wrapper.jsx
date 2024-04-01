import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Español from "../../lang/es.json";
import English from "../../lang/en.json";

export const Context = React.createContext();

const local = "en";
const lang = local === "en" ? English : Español;

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  const [selectedLocale, setSelectedLocale] = useState(local);

  function selectLanguage(e) {
    setLocale(e);
    const selectedMessages = e === "en" ? English : Español;
    setMessages(selectedMessages);
    // setSelectedLocale(e);
    // console.log(selectedMessages);
  }

  const selectedMessages = messages; // locale === "en" ? messages["en"] : messages["es"] ;
  console.log(selectedMessages);
  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider locale={locale} messages={messages}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
