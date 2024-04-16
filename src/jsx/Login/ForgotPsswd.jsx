import React, { useState, useEffect } from "react";
import { sentMail } from "../../js/readMail.js";
// import { restartPassword } from "../../js/restartPsswd";
import "../../css/AuthForm.css";
import { useNavigate } from "react-router-dom";
import "../../js/AuthForm.js";
import { FormattedMessage } from "react-intl";

const ForgotPsswd = () => {
  window.onload();
  const [mail, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sentMail(mail);
      if (data.logged) {
        setTimeout(() => {
          navigate("/successfull-mail");
        }, 1000);
        setMessage("E-mail sent successfully.");
        setMessageClass("success");
      } else {
        setMessage("Check email, not found.");
        setMessageClass("error");
      }
    } catch (error) {
      console.error("E-mail failed:", error);
      setMessage("Check email, not found.");
    }
  };

  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        {/* <img src="/img/logo.png" alt="Logo" /> */}
        <h1 className="font-semibold text-3xl pb-2">
          {" "}
          <FormattedMessage
            id="login.reset"
            defaultMessage="Reset your password"
          />
        </h1>
        <p>
          <FormattedMessage
            id="login.resetText"
            defaultMessage="Enter your email address and we'll send you a link to get back into your account."
          />
        </p>
        {message && <div className={`message ${messageClass}`}>{message}</div>}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              value={mail}
              onChange={(e) => setUsername(e.target.value)}
              required
              // className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label
              htmlFor="text"
              className="mt-2"
              // className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              <FormattedMessage
                id="login.email"
                defaultMessage="Mail Address"
              />{" "}
            </label>
          </div>

          <button type="submit" className="btn">
            <FormattedMessage id="login.sendLink" defaultMessage="Send Link" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPsswd;
