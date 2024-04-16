// VideoPopup.js
import "../../css/mrmodal.css"
import React, { useState } from 'react';

function VideoPopup({ src, onClose }) {
  const [showPopup, setShowPopup] = useState(true);

  // Función para cerrar la ventana emergente
  const closePopup = () => {
    setShowPopup(false);
    onClose(); // Llama a la función onClose proporcionada por el padre para cerrar el modal
  };

  return (
    <div>
      {/* Ventana emergente con el video */}
      {showPopup && (
        <div className="popup">
          {/* Botón para cerrar la ventana emergente */}
          <button className="close-btn" onClick={closePopup}>Cerrar</button>
          <div className="popup-inner">
            {/* Video */}
            <video className="video" controls>
              <source src={src} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPopup;
