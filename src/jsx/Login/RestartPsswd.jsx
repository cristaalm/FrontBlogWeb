import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restartPassword } from "../../js/restartPsswd";
import "../../css/AuthForm.css";
// Icons
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { FormattedMessage } from "react-intl";

const RestartPsswd = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await restartPassword(id, password);
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
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword);
  };
  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        <h1 className="font-semibold text-3xl pb-6">
          Restart your password
        </h1>
        {message && <div className={`message ${messageClass}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 ">
            <input
              className="inputAuth"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="text" className="mt-2">
              Password
            </label>
            <button
              type="button"
              className="eye2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <Eye color="whitesmoke" />
              ) : (
                <EyeSlash color="whitesmoke" />
              )}
            </button>
          </div>
          <div className="relative z-0 w-full mb-5">
            <input
              className="inputAuth"
              type={showPassword1 ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="text" className="mt-2">
              Confirm Password
            </label>

            <button
              type="button"
              className="eye2"
              onClick={togglePasswordVisibility1}
            >
              {showPassword1 ? (
                <Eye color="whitesmoke" />
              ) : (
                <EyeSlash color="whitesmoke" />
              )}
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
