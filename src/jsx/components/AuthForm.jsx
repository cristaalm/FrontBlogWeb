import React, { useState, useEffect } from "react";
import { loginUser } from "../../js/readUsers";
import "../../css/AuthForm.css";
import {Link, useNavigate } from "react-router-dom";
import "../../js/AuthForm.js";
// Icons
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const AuthForm = () => {
  window.onload();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === null || storedAuth === "false") {
      localStorage.setItem("isAuthenticated", "false");
    } else {
      navigate("/new-post");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("isAuthenticated", data.logged.toString());
      if (data.logged) {
        setTimeout(() => {
          navigate("/new-post");
        }, 1000);
        setMessage("User logged in correctly.");
        setMessageClass("success");
      } else {
        setMessage("Check password or username.");
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
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        <img src="/img/logo.png" alt="Logo" />
        {/* <h1>Login</h1> */}
        {message && <div className={`message ${messageClass}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-control">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye color="whitesmoke"/> : <EyeSlash color="whitesmoke"/>}
            </button>
          </div>
          <div className="form-control2">
          <Link to="/forgot-psswd">Forgot your password?</Link>
          </div>
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
