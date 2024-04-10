import React, { useState, useEffect, useContext } from "react";
import { hydrateRoot } from "react-dom/client";

import { loginUser } from "../../js/readUsers.js";
import "../../css/AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Elements/Wrapper.jsx";
import { FormattedMessage } from "react-intl";

// Icons
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Footer from "../Elements/Footer.jsx";

const AuthForm = () => {
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [labelsAnimated, setLabelsAnimated] = useState(false);

  let navigate = useNavigate();
  const animateLabels = () => {
    const labels = document.querySelectorAll(".form-control label");
    labels.forEach((label) => {
      const labelText = label.getAttribute("data-message-id");
      if (labelText) {
        const messageComponent = (
          <FormattedMessage id={labelText} defaultMessage={labelText} />
        );
        hydrateRoot(document.getElementById(label.id), messageComponent);
      }
    });
  };
  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === null || storedAuth === "false") {
      localStorage.setItem("isAuthenticated", "false");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {}, [labelsAnimated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userName = localStorage.getItem("userName");
      const data = await loginUser(username, password);
      localStorage.setItem("isAuthenticated", data.logged.toString());
      if (data.logged) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        setMessage(
          <FormattedMessage
            id="login.success"
            defaultMessage="User logged in correctly."
          />
        );
        localStorage.setItem("userName", username);
        setMessageClass("success");
      } else {
        setMessage(
          <FormattedMessage
            id="login.error"
            defaultMessage="Check password or username"
          />
        );
        setMessageClass("error");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Check password or username.");
      localStorage.setItem("isAuthenticated", "false");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <section>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
        <div className="container">
          <img src="/img/logo.png" alt="Logo" />
          {message && (
            <div className={`message ${messageClass}`}>{message}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group" style={{ marginBottom: "20px" }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>
                {" "}
                <FormattedMessage id="login.username" defaultMessage="Username">
                  {(message) => <div>{message}</div>}
                </FormattedMessage>
                {/* <FormattedMessage
                  id="login.username"
                  defaultMessage="Username"
                /> */}
              </label>
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>
                <FormattedMessage
                  id="login.password"
                  defaultMessage="Password"
                />
              </label>
              <button
                type="button"
                className="eye"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <Eye color="whitesmoke" />
                ) : (
                  <EyeSlash color="whitesmoke" />
                )}
              </button>
            </div>
            <div className="form-control2">
              <Link to="/forgot-psswd">
                <FormattedMessage
                  id="login.forgotPssd"
                  defaultMessage="Forgot your password?"
                />
              </Link>
            </div>
            <button type="submit" className="btn">
              <FormattedMessage id="login.signIn" defaultMessage="Sign In" />
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AuthForm;
