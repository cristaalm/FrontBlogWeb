import React, { useContext } from "react";
import "../../../css/Elements.css";
import { Context } from "./Wrapper";

const Footer = () => {
  const context = useContext(Context);

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
    marginTop: "10px"
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
      <div style={footerColumnStyle}>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-buffer"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="mail"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="people"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
      <div style={footerColumnStyle}>
        <p>Umizoomies © 2024</p>
      </div>
      <div style={footerColumnStyle}>
        <select
          style={selectStyle}
          value={context.locale}
          onChange={context.selectLanguage}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </footer>
  );
};

export default Footer;
