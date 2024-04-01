import React from "react";
import "../../css/AuthForm.css";
import { Link } from "react-router-dom";

const SentMsg = ({ message, messageClass }) => {
  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        <h1>Email sent</h1>
        <p>
          We sent you an email. Follow the instructions to get back into your
          account.
        </p>
        {message && <div className={`message ${messageClass}`}>{message}</div>}
        <br></br>
        <button type="submit" className="btn">
          <Link to="/login" className="msg">Back to Login</Link>
        </button>
      </div>
    </section>
  );
};

export default SentMsg;
