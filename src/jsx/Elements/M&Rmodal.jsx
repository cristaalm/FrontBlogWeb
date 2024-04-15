import React, { useState } from 'react';

function VideoPopup({ src, onClose }) {
  const [showPopup, setShowPopup] = useState(false);

  // Función para abrir la ventana emergente
  const openPopup = () => {
    setShowPopup(true);
  };

  // Función para cerrar la ventana emergente
  const closePopup = () => {
    setShowPopup(false);
    onClose(); // Llama a la función onClose proporcionada por el padre para cerrar el modal
  };

  return (
    <div>
      {/* Botón para abrir la ventana emergente */}
      <button onClick={openPopup}>Mostrar Video</button>

      {/* Ventana emergente con el video */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            {/* Botón para cerrar la ventana emergente */}
            <button className="close-btn" onClick={closePopup}>Cerrar</button>
            {/* Video */}
            <video controls>
              <source src={src} type="/src/video/ODS6.mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPopup;
