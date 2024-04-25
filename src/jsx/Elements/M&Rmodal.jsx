import React from "react";
import "../../css/mrmodal.css";

const MediaPopup = ({ src, type, onClose }) => {
  const closeModal = () => {
    onClose(); 
  };

  return (
    <div className="popup" >
      <div className="popup-inner">
        {type === "image" ? (
          <img src={src} alt="Popup" className="popup-content" />
        ) : (
          <video src={src} controls className="popup-content" style={{ maxWidth: "720px" }}></video>
        )}
        <ion-icon
          name="close"
          className="close-icon"
          onClick={closeModal}
          style={{ position: "absolute", top: "-20px", right: "-20px", cursor: "pointer", fontSize: "24px", color: "#650303" }}
        ></ion-icon>
      </div>
    </div>
  );
};

export default MediaPopup;
