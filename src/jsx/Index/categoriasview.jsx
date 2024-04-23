import React from 'react';
import "../../css/categoriaview.css";
import Footer from "../Elements/Footer.jsx";
import Encabezado2 from './encabezado2.jsx';

function CategoriaView() {
  return (
    <div className='cuerpo'>
      <Encabezado2 />
      {/* Contenido */}
      <article className="categoriasdestacada">
        <div className="Imagen">
          <img src="../../../public/img/bgcategoria.png" alt="Descripción de la imagen" />
          <div className="textimg"> Categoria </div>
          <div className="textimg2">Descripcion de la Categoria</div>
        </div>
      </article>
      <article className="contenedores-categorias">
        <div className='Separador'>
          <div className='Texsep'>Blog Post</div>
        </div>
        <div className='todos-los-cuadros'>
          <div className='cuadro1'>
            <div className='contenedor-de-img'>
                <img className='img-destacada' src="../../../public/img/img6.png" alt="" />
            </div>
            <div className="contenido-entrada">
              <div className='text1' >Nombre del creador - Fecha de publicación</div>
              <div className='text2' >Título de Entrada</div>
              <div className='text3' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
          </div>
          <div className='cuadro2'>
            <div className='contenedor-de-img'>
                <img className='img-destacada' src="../../../public/img/img5.png" alt="" />
            </div>
            <div className="texto-entradas">
              <div className='text1' >Nombre del creador - Fecha de publicación</div>
              <div className='text2' >Título de Entrada</div>
              <div className='text3' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
          </div>
          <div className='cuadro3'>
            <div className='contenedor-de-img'>
                <img className='img-destacada' src="../../../public/img/img6.png" alt="" />
            </div>
            <div className="contenido-entrada">
              <div className='text1' >Nombre del creador - Fecha de publicación</div>
              <div className='text2' >Título de Entrada</div>
              <div className='text3' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default CategoriaView;
