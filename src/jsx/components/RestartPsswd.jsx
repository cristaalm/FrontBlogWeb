import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restartPassword } from "../../js/restartPsswd";
import "../../css/AuthForm.css";
// Icons
import { Eye, EyeSlash } from "react-bootstrap-icons";

const RestartPsswd = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await restartPassword(id, password);
      console.log(id);
      if (password === passwordConfirm) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setMessage("New password saved correctly.");
        setMessageClass("success");
      } else {
        setMessage("Passwords do not match");
        setMessageClass("error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("An error occurred while resetting the password");
      setMessageClass("error");
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
        <h1>Restart your password</h1>
        {message && <div className={`message ${messageClass}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye color="whitesmoke" /> : <EyeSlash color="whitesmoke" />}
            </button>
          </div>
          <div className="form-control">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye color="whitesmoke" /> : <EyeSlash color="whitesmoke" />}
            </button>
          </div>
          <button type="submit" className="btn">
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default RestartPsswd;