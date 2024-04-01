import React, { useState, useEffect } from "react";
import { sentMail } from "../../js/readMail.js";
// import { restartPassword } from "../../js/restartPsswd";
import "../../css/AuthForm.css";
import { useNavigate } from "react-router-dom";
import "../../js/AuthForm.js";

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
        <h1>Reset your password</h1>
        <p>Enter your email address and we'll send you a link to get back into your account.</p>
        {message && <div className={`message ${messageClass}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              value={mail}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email address</label>
          </div>
          <button type="submit" className="btn">
            Send link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPsswd;
