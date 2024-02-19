import React from "react";
import "./style.css"; // Asegúrate de tener este archivo en tu proyecto de React

class Login extends React.Component {
  componentDidMount() {
    // Simula el comportamiento del script JS en React
    const labels = document.querySelectorAll(".form-control label");

    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letter, idx) =>
            <span style="transition-delay:${idx * 50}ms">${letter}</span>
        )
        .join("");
    });
  }

  render() {
    return (
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Inicio Sesión</title>
        </head>
        <body>
          <section>
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
            <div className="container">
              <h1>Inicio Sesión</h1>
              <form>
                <div className="form-control">
                  <input type="text" required />
                  <label>Email</label>
                </div>
                <div className="form-control">
                  <input type="password" required />
                  <label>Contraseña</label>
                </div>
                <button className="btn">Inicio</button>
                <p className="text">
                  ¿No tienes cuenta? <a href="#">Registro</a>
                </p>
              </form>
            </div>
          </section>
        </body>
      </html>
    );
  }
}

export default Login;