import React, { useState, useEffect, useContext } from "react";
import { loginUser } from "../../js/readUsers.js";
import "../../css/AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Modal from "react-modal";
import Checkbox from '@mui/material/Checkbox';
// Icons
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Footer from "../Elements/Footer.jsx";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      // No se pueden enviar credenciales sin aceptar los términos
      setMessage("Please accept the terms and conditions.");
      setMessageClass("error");
      return;
    }
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
  function openTerminosYcondiciones() {
    setContactModalIsOpen(true);
  }
  const [openTerminosYcondicionesIsOpen, setContactModalIsOpen] = React.useState(false);
  function afterOpenModal() {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
  }
  function closeModal() {
    setContactModalIsOpen(false);
    setDevelopersModalIsOpen(false);
  }
  const customStyles = {
    content: {
      // zIndex: "99999",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px", // Set the maximum width of the modal
      padding: "20px", // Add padding to the modal content
      borderRadius: "8px", // Add border radius to the modal
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Add a subtle shadow
    },
    overlay: {
      zIndex: "9999",
      backgroundColor: "rgba(3, 81, 101, 0.5)", // Add a semi-transparent overlay
    },
  };
  
    const handleAccept = () => {
      setAcceptTerms(!acceptTerms);
    };
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
            <div className="form-control2">
              <Checkbox {...label}  onClick={handleAccept} />
              <Link to="" className="underline" onClick={openTerminosYcondiciones} >
                <FormattedMessage
                  id="login.terms"  
                />
              </Link>
              <Modal
                id="root"
                isOpen={openTerminosYcondicionesIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Contact Us Modal"
              >
                <div  style={{ display: "flex", justifyContent: "flex-end" }} >
                  <ion-icon
                    name="close"
                    onClick={closeModal}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "#650303",
                    }}
                  ></ion-icon>
                </div>
                <div style={{ maxHeight: "300px", overflowY: "auto" }} >
                  <strong>Términos y Condiciones</strong>
                  <ol>
                    <li><strong>Aceptación de los Términos:</strong> Al acceder o utilizar nuestro servicio, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.</li>
                    <li><strong>Uso Apropiado:</strong> El servicio solo puede ser utilizado para fines legales y de acuerdo con estos términos. Te comprometes a no utilizar el servicio para actividades ilegales o fraudulentas, ni para acosar, abusar o violar los derechos de otros usuarios.</li>
                    <li><strong>Privacidad:</strong> Tu privacidad es importante para nosotros. Consulta nuestra política de privacidad para entender cómo recopilamos, utilizamos y protegemos tu información personal.</li>
                    <li><strong>Cuentas de Usuario:</strong> Eres responsable de mantener la confidencialidad de tu contraseña y de cualquier actividad que ocurra en tu cuenta. Notifícanos de inmediato cualquier uso no autorizado de tu cuenta o cualquier otra violación de seguridad.</li>
                    <li><strong>Propiedad Intelectual:</strong> El contenido y los materiales proporcionados en el servicio están protegidos por derechos de autor y otras leyes de propiedad intelectual. No tienes derecho a utilizar el contenido del servicio de ninguna manera que infrinja estos derechos.</li>
                    <li><strong>Limitación de Responsabilidad:</strong> En ningún caso seremos responsables por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos que surjan del uso o la imposibilidad de usar el servicio.</li>
                    <li><strong>Modificaciones:</strong> Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en el servicio.</li>
                    <li><strong>Ley Aplicable:</strong> Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del lugar donde se encuentre la sede de tu empresa, sin tener en cuenta sus conflictos de principios legales.</li>
                  </ol>
                  <p>Al utilizar nuestro servicio, aceptas estos términos y condiciones. Si tienes alguna pregunta sobre estos términos, contáctanos.</p>
                  <p>Fecha de última actualización: [fecha]</p>
                </div>
              </Modal>
            </div>
              <button 
              type="submit" 
              className={`btn ${!acceptTerms ? 'disabled' : ''}`} // Agregar clase 'disabled' si no se aceptan los términos
              disabled={!acceptTerms} // Deshabilitar el botón si no se aceptan los términos 
              >
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
