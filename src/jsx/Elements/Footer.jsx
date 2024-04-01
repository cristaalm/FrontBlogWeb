import "../../css/Elements.css";
import { Context } from "./Wrapper";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { FormattedMessage, useIntl } from "react-intl"; // Importa FormattedMessage y useIntl
import React, { useContext, useRef, useState } from "react";
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
    fontWeight: 300,
    borderRadius: "5px",
    transition: "border-color 0.3s, background-color 0.3s, color 0.3s",
  };

  return (
    <footer style={footerStyle}>
      {/* Usamos formatMessage para traducir "app.test" según el idioma seleccionado */}
      <FormattedMessage id="app.test" defaultMessage="Tu puedes">
        {(message) => <div>{message}</div>}
      </FormattedMessage>
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
              <ion-icon name="logo-buffer"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a
              className="social-icon__link"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Contact us"
              onClick={openContactModal}
            >
              <ion-icon name="mail"></ion-icon>
            </a>
            <Modal
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
              <img
                src="public/img/contactUs.png"
                width="100%"
                alt="Contact Us"
              />
              <h2>Contact Us</h2>
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" // Ruta a la imagen del logo de Gmail
                  alt="Gmail Logo"
                  style={{ width: "25px", height: "19px", marginRight: "8px" }}
                />
                aquavisionotification@gmail.com
              </div>
            </Modal>
          </li>
          <li className="social-icon__item">
            <a
              className="social-icon__link"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Developers"
              onClick={openDevelopersModal}
            >
              <ion-icon name="people"></ion-icon>
            </a>
            <Modal
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
              <img src="public/img/teamOne.jpg" width="100%" alt="Developers" />
              <h2>Developers</h2>
              <div>
                {/* <div className="dynamic-names"> */}
                <p>Medina López Brisa Cristal</p>
                <p>Ceja Ayala Gustavo</p>
                <p>Huitron Varela Miguel Ángel</p>
                <p>Flores López Adrián</p>
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
