import React from "react";
import { Tooltip } from "react-tooltip";

const Footer = () => {
  const footerStyle = {
    zIndex: "9999",
    position: "relative",
    width: "100%",
    background: "#b8ddd6",
    padding: "10px 50px",
    display: "flex",
    flexDirection: "column", // Cambiar a columna
    alignItems: "center", // Centrar elementos horizontalmente
    marginTop: "auto", // Mover el footer hacia abajo
  };
  
  const footerColumnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#035165",
    marginTop: "10px",
    width: "100%", // Añadir para que ocupe el ancho completo
  };

  const columnWrapperStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  };
  
  return (
    <footer style={footerStyle}>
      <Tooltip
        id="my-tooltip"
        style={{ backgroundColor: "#035165", color: "whitesmoke" }}
      />
      <div style={footerColumnStyle}>
        <div style={columnWrapperStyle}>
          <ul className="social-icon2">
            <li className="social-icon__item">
              <a
                className="social-icon_link"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="AquaVision API"
                href="https://backblogweb.onrender.com/api-docs/"
                target="_blank"
                style={{ display: "flex", alignItems: "center", color: "#035165", textDecoration: "none" }}
              >
                <ion-icon name="logo-buffer" style={{ color: "#035165", fontSize: "1.3rem" }}></ion-icon>
                <p style={{ paddingLeft: "10px", fontSize: "1rem", textDecoration: "none" }} >AquaVision API</p>
              </a>
            </li>
          </ul>
          <p>Umizoomies © 2024</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;