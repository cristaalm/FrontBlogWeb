import React from "react";
import { Tooltip } from "react-tooltip";
// import "../../css/Elements.css";
import { BaseUrl } from "../../constants/global";
const Footer = () => {
  const footerStyle = {
    zIndex: "9999",
    position: "absolute",
    width: "100%",
    background: "#b8ddd6",
    padding: "10px 50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    left: 0,
    bottom: 0,
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

  const columnWrapperStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const pStyle = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none !important",
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
            <li className="social-icon__item" style={{ marginTop: "14px" }}>
              <a
                className="social-icon_link"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="AquaVision API"
                href={BaseUrl + "/api-docs/"}
                target="_blank"
                style={pStyle}
              >
                <ion-icon
                  name="logo-buffer"
                  style={{ color: "#035165", fontSize: "1.3rem" }}
                ></ion-icon>
                <p
                  style={{
                    paddingLeft: "10px",
                    fontSize: "1rem",
                    color: "#035165",
                    textDecoration: "none",
                  }}
                >
                  AquaVision API
                </p>
              </a>
            </li>
          </ul>
          <p>Umizoomies © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
