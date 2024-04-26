import React from 'react';
import { Link } from "react-router-dom";

const Error404 = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };

  const styles = {
    errorContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Esto asegura que el contenido esté centrado verticalmente en la página
      backgroundImage: 'url("https://recla.org/wp-content/uploads/2023/10/mano-humana-tocando-agua-rio-crisis-agua.webp")', // Reemplaza "URL_DE_LA_IMAGEN" con la URL de la imagen de internet
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px',
      color: '#fff', // Cambiamos el color del texto para que sea visible sobre el fondo
    },
    errorTitle: {
      fontSize: '100px',
      color: '#000',
    },
    errorMessage: {
        fontSize: '38px',
        color: '#FF5733', // Cambiamos el color del texto para que sea visible sobre el fondo
        marginBottom: '20px',
        
    },
    errorButton: {
      backgroundColor: '#FF5733',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    errorButtonHover: {
      backgroundColor: '#FF6347',
    },
  };

  return (
    <div style={styles.errorContainer}>
      <h1 style={styles.errorTitle}>404</h1>
      <p style={styles.errorMessage}>Lo sentimos, la página que estás buscando no se ha encontrado.</p>
      <Link to="/welcome">
      <button style={styles.errorButton} onClick={goBack}>Volver</button>
      </Link>
    </div>
  );
};

export default Error404;


