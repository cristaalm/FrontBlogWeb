import React from "react";
import "../../css/home.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";

function Home() {
  return (
    <div className="coli">
      <div className="medi">
        {/* Header */}
        <header className="headerhome">
          <div className="iml">
            <img src="../../../public/img/logo.png" />
          </div>
          <div className="menum">
            <button className="Bienvenida">Bienvenida</button>
            <button className="Recursos">Recursos Multimedia</button>
            <button className="Entradas">Entradas</button>
            <button className="Quizz">Quizz</button>
          </div>
          <div className="log">
            <Link to="/login">
              <CircleUser size={35}/>
            </Link>
          </div>
        </header>

        {/* Body */}
        <div className="bodyhome">
          <div className="Carrusel">
            <video src="src/video/aquavision2.mp4" autoPlay loop muted></video>
          </div>
          <div className="separador1">
            <div className="texto10">
              <h2>Top Categorias</h2>
            </div>
          </div>
          <div className="contenedores">
            <div className="contenedor1">
              <div className="imagen1">
                <img src="../../../public/img/img1.png" alt="Imagen 1" />
              </div>
              <div className="titulo1">
                <h2>Lorem ipsum</h2>
              </div>
              <div className="contenido1">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="boton">
                <Button variant="success">Read More</Button>{" "}
              </div>
            </div>

            <div className="contenedor2">
              <div className="imagen2">
                <img src="../../../public/img/img2.png" alt="Imagen 2" />
              </div>
              <div className="titulo2">
                <h2>Lorem ipsum</h2>
              </div>
              <div className="contenido2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="boton">
                <Button variant="success">Read More</Button>{" "}
              </div>
            </div>

            <div className="contenedor3">
              <div className="imagen3">
                <img src="../../../public/img/img3.png" alt="Imagen 3" />
              </div>
              <div className="titulo3">
                <h2>Lorem ipsum</h2>
              </div>
              <div className="contenido3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="boton1">
                <Button variant="success">Read More</Button>{" "}
              </div>
            </div>
            <div className="body"></div>
          </div>
        </div>

        {/* Unbody */}
        <div className="separador2">
          <div className="texto11">
            <h2>Ultimas Entradas</h2>
          </div>
        </div>
        <div className="contenedores2">
          <div className="contenedor11">
            <div className="imagen3">
              <img src="../../../public/img/img4.png" alt="Imagen 4" />
            </div>
            <div className="titulo3">
              <h2>Lorem ipsum</h2>
            </div>
            <div className="contenido3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="boton1">
              <Button variant="success">Read More</Button>{" "}
            </div>
          </div>
          <div className="contenedor12">
            <div className="imagen3">
              <img src="../../../public/img/img4.png" alt="Imagen 4" />
            </div>
            <div className="titulo3">
              <h2>Lorem ipsum</h2>
            </div>
            <div className="contenido3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="boton1">
              <Button variant="success">Read More</Button>{" "}
            </div>
          </div>
          <div className="contenedor13">
            <div className="imagen3">
              <img src="../../../public/img/img4.png" alt="Imagen 4" />
            </div>
            <div className="titulo3">
              <h2>Lorem ipsum</h2>
            </div>
            <div className="contenido3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="boton1">
              <Button variant="success">Read More</Button>{" "}
            </div>
          </div>
        </div>
        <div className="separador3"></div>
        <div className="quizzform">
          <div className="quizztext">
            <h2>Quizz</h2>
          </div>
          <div className="quizzimg">
            <img src="../../../public/img/logo.png"></img>
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
