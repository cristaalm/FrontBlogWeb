import React, { useState, useEffect, useContext } from "react";
import { loginUser } from "../../js/readUsers.js";
import "../../css/AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

// Icons
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Footer from "../Elements/Footer.jsx";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          <img src="/img/logo.png" alt="Logo"/>
          {message && (
            <div className={`message ${messageClass} mt-0 mb-5`}>{message}</div>
          )}
          <p className="pb-3 font-semibold text-center text-2xl ml-1">
            <FormattedMessage id="login.login" defaultMessage="Login" />
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                value={username}
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
                  id="login.username"
                  defaultMessage="Username"
                />
              </label>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="text"
                className="mt-2"
                // className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
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
              <Link to="/forgot-psswd" className="underline">
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
