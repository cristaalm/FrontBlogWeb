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
          <video src="src/video/Aquavision.mp4"autoPlay loop muted></video >
        </div> 
        <div className= 'separador'>
        </div>
        <div className='contenedores'>
          <div className='contenedor1'>
            <div className='imagen1'>
              <img src='/src/img/img1.png' alt='Imagen 1' />
            </div>
            <div className='titulo1'>
              <h2>Título 1</h2>
            </div>
            <div className='contenido1'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            </div>
        </div>

        <div className='contenedor2'>
          <div className='imagen2'>
            <img src='/src/img/img2.png' alt='Imagen 2' />
          </div>
          <div className='titulo2'>
            <h2>Título 2</h2>
          </div>
          <div className='contenido2'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>

        <div className='contenedor3'>
          <div className='imagen3'>
            <img src='/src/img/img3.png' alt='Imagen 3' />
          </div>
          <div className='titulo3'>
            <h2>Título 3</h2>
          </div>
          <div className='contenido3' >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      <div className='quizz'>
        <div className='body'>

        </div>
      </div>

        </div>
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
