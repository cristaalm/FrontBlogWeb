import React, { useState, useEffect } from "react";
import { loginUser } from "../../js/readUsers";
import "../../css/AuthForm.css";
import { useNavigate } from "react-router-dom";
import "../../js/AuthForm.js";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === null || storedAuth === "false") {
      localStorage.setItem("isAuthenticated", "false");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("isAuthenticated", data.logged.toString());
      if (data.logged) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        setMessage("Usuario logueado correctamente.");
      } else {
        setMessage("Revise contraseña o usuario.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Revise contraseña o usuario.");
      localStorage.setItem("isAuthenticated", "false");
    }
  };

  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        <img src="/img/logo.png" alt="Logo" />
        <h1>Iniciar sesión</h1>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Usuario</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Contraseña</label>
          </div>
          <button type="submit" className="btn">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
