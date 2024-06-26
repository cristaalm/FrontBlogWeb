import "../../css/Elements.css";
import { Context } from "./Wrapper";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { FormattedMessage, useIntl } from "react-intl"; // Importa FormattedMessage y useIntl
import React, { useContext, useRef, useState } from "react";
import { BaseUrl } from "../../constants/global";
const Footer = () => {
  const context = useContext(Context);
  const intl = useIntl(); // Obtiene el objeto intl para usar formatMessage
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

  const [selectedLanguage, setSelectedLanguage] = useState(context.locale); // Estado para almacenar el valor seleccionado en el campo select

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue); // Actualiza el estado con el valor seleccionado
    context.selectLanguage(selectedValue); // Llama al método selectLanguage del contexto
  };

  const subtitle = useRef(null);

  const [contactModalIsOpen, setContactModalIsOpen] = React.useState(false);
  const [developersModalIsOpen, setDevelopersModalIsOpen] =
    React.useState(false);

  function openContactModal() {
    setContactModalIsOpen(true);
  }

  function openDevelopersModal() {
    setDevelopersModalIsOpen(true);
  }

  function closeModal() {
    setContactModalIsOpen(false);
    setDevelopersModalIsOpen(false);
  }

  function afterOpenModal() {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setContactModalIsOpen(false);
    setDevelopersModalIsOpen(false);
  }

  const footerStyle = {
    zIndex: "9999",
    position: "relative",
    width: "100%",
    background: "#b8ddd6",
    padding: "10px 50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const footerColumnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#035165",
    marginTop: "10px",
  };

  const selectStyle = {
    alignItems: "right",
    width: "50%",
    padding: "8px 12px",
    border: "2px solid #035165",
    backgroundColor: "#fff",
    color: "#035165",
    fontSize: "1rem",
    fontWeight: 400,
    borderRadius: "5px",
    transition: "border-color 0.3s, background-color 0.3s, color 0.3s",
  };

  return (
    <footer style={footerStyle}>
      <Tooltip
        id="my-tooltip"
        style={{ backgroundColor: "#035165", color: "whitesmoke" }}
      />
      <div style={footerColumnStyle}>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a
              className="social-icon__link"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="AquaVision API"
              href="https://backblogweb.onrender.com/api-docs/"
              target="_blank"
            >
              <ion-icon
                name="logo-buffer"
                style={{ color: "#035165" }}
              ></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a
              className="social-icon__link"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={intl.formatMessage({
                id: "modal.contactUs",
                defaultMessage: "Comtact Us",
              })}
              onClick={openContactModal}
            >
              <ion-icon name="mail" style={{ color: "#035165" }}></ion-icon>
            </a>
            <Modal
              ariaHideApp={false}
              id="root"
              isOpen={contactModalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Contact Us Modal"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <img src="/img/contactUs.png" width="100%" alt="Contact Us" />
              <h2>
                <span className="font-bold text-lg">
                  <FormattedMessage
                    id="modal.contactUs"
                    defaultMessage="Forgot your password?"
                  />
                </span>
              </h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/img/Gmail_icon_(2020).svg.png" // Ruta a la imagen del logo de Gmail
                  alt="Gmail Logo"
                  style={{ width: "25px", height: "19px", marginRight: "8px" }}
                />
                <div>aquavisionotification@gmail.com</div>
              </div>
            </Modal>
          </li>
          <li className="social-icon__item">
            <a
              className="social-icon__link"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={intl.formatMessage({
                id: "modal.developers",
                defaultMessage: "Developers",
              })}
              onClick={openDevelopersModal}
            >
              <ion-icon name="people" style={{ color: "#035165" }}></ion-icon>
            </a>
            <Modal
              ariaHideApp={false}
              id="root1"
              isOpen={developersModalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Developers Modal"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <img src="/img/teamOne.jpg" width="100%" alt="Developers" />
              <h2>
              <span className="font-bold text-lg">
                <FormattedMessage
                  id="modal.developers"
                  defaultMessage="Developers"
                />
                </span>
              </h2>
              <div>
                {/* <div className="dynamic-names"> */}
                <p>💧 Medina López Brisa Cristal</p>
                <p>💧 Ceja Ayala Gustavo</p>
                <p>💧 Huitron Varela Miguel Ángel</p>
                <p>💧 Flores López Adrián</p>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
      <div style={footerColumnStyle}>
        <p>Umizoomies © 2024</p>
      </div>
      <div style={footerColumnStyle}>
        <select
          style={selectStyle}
          value={selectedLanguage} // Usa el estado para el valor seleccionado
          onChange={handleChange} // Agrega el controlador onChange
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </footer>
  );
};

export default Footer;
