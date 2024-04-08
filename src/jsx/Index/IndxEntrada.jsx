import React from 'react'
import "../../css/indexentrada.css";
import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";
import Footer from "../Elements/Footer.jsx";

export default function Entrada() {
    return (
      <>
        <header className="headerhome">
          <div className="iml">
              <img src="/img/logo.png" alt="Logo" />
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
          <div className="Imagen">
            <img src="img/bgcategoria.png" alt="Descripción de la imagen" />
            <div className="textimg">   Categoria   </div>
            <div className="textimg2">Descripcion de Categoria</div>
          </div>
        </div>
        <div className='Separador'>
          <div className='Texsep'>Entradas</div>
        </div>
        <div className='Contenedores30'>
          <div className='contenedor31'>
          <div className="imagen31">
                <img src="/img/img6.png" alt="Imagen 6" />
              </div>
              <div className='texcont1'>Nombre del Creador / Fecha de Publicacion</div>
              <div className='texcont2'>Titulo de Entrada1</div>
              <div className='texcon3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
          <div className='contenedor32'>
          <div className="imagen32">
                <img src="/img/img6.png" alt="Imagen 6" />
              </div>
              <div className='texcont1'>Nombre del Creador / Fecha de Publicacion</div>
              <div className='texcont2'>Titulo de Entrada2</div>
              <div className='texcon3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
          <div className='contenedor33'>
          <div className="imagen33">
                <img src="/img/img6.png" alt="Imagen 6" />
              </div>
              <div className='texcont1'>Nombre del Creador / Fecha de Publicacion</div>
              <div className='texcont2'>Titulo de Entrada3</div>
              <div className='texcon3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
          <Footer />
        </div>
      </>
    );
}
