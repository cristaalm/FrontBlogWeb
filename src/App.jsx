import React from 'react';
import './App.css'; // Asegúrate de que el path sea correcto



function App() {
  // Componente para animar las etiquetas
const AnimatedLabel = ({ text }) => (
  <label>
    {text.split('').map((letter, idx) => (
      <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
        {letter}
      </span>
    ))}
  </label>
);
  return (
    <div className='mine'>
      <div className='contenedor'>
        <section className='logi'>
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
          <div className="container">
            
            <img className="logoa"src="src/img/logo without bg.png" alt="Logo de AquaVision  " />


            <div className="inicio">
                <h2 class="borderp">AquaVision</h2>
                <h2 class="wa">AquaVision</h2>
                </div>

            <form>
              <div className="form-control">
                <input className='trans' type="email" required />
                <AnimatedLabel text="Correo" />
              </div>
              <div className="form-control">
                <input className='trans' type="password" required />
                <AnimatedLabel text="Contraseña" />
              </div>
              <a href="#" className="login-link">
                <span>inicio</span>
                <div className="muv"></div>
              </a>
            </form>
          </div>
        </section>
      </div>
      
    </div>
   
  );
};

export default App;


