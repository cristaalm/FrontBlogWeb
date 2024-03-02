import React from 'react';
import './home.css';
import imageUrl from './img/logo without bg.png';

function Home() {
  return (
    <div>
      {/* Header */}
      <header className="headerhome">
        <h1>Aquavison GOD</h1>
      </header>

      {/* Body */}
      <div className="bodyhome">
        <img src={imageUrl} alt="Descripción de la imagen" />
        <p>Aqui va ir el contenido para la web UwU.</p>
      </div>

      {/* Footer */}
      <footer className="footerhome">
        <p>Umizoomies © 2024</p>
      </footer>
    </div>
  );
}

export default Home;
