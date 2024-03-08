import React from 'react';
import './home.css';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <div className='coli'>
      <div className='medi'>
              {/* Header */}
      <header className="headerhome">
        <div className='iml'>
        <img src="src/img/logo without bg.png" />
        </div>
        <div className='menum'>
          <button className='Bienvenida'>Bienvenida</button>
          <button className='Recursos'>Recursos Multimedia</button>
          <button className='Entradas'>Entradas</button>
          <button className='Quizz'>Quizz</button>
        </div>
        <div className='log'>
          <Button variant="outline-success">Log in</Button>{' '}
        </div>
      </header>

      {/* Body */}
      <div className="bodyhome">
        <div className='Carrusel'>
          <video src="src/video/avwaves.mp4"autoPlay loop muted></video >
        </div> 
        <p>Aqui va ir el contenido para la web UwU.</p>
      </div>

      {/* Footer */}
      <footer className="footerhome">
        <p>Umizoomies © 2024</p>
      </footer>

      </div>

    </div>
  );
}

export default Home;
