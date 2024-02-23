import React from 'react';
import './App.css'; // Asegúrate de que el path sea correcto

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

function App() {
  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        <img src="src/img/logo without bg.png" alt="" />


        <div class="inicio">
            <h2 class="border">AquaVision</h2>
            <h2 class="wa">AquaVision</h2>
            </div>

        <form>
          <div className="form-control">
            <input type="email" required />
            <AnimatedLabel text="Correo" />
          </div>
          <div className="form-control">
            <input type="password" required />
            <AnimatedLabel text="Contraseña" />
          </div>
          <a href="#" className="login-link">
            <span>inicio</span>
            <div className="muv"></div>
          </a>
        </form>
      </div>
    </section>
  );
}

export default App;


