import React, { useState } from 'react';
import "../../css/cuerpo.css"

const Cuerpo =() => {
      // Estado para manejar la vista de los elementos (lista o cuadricula)
  const [viewMode, setViewMode] = useState('lista'); // 'lista' es el valor por defecto

  // Función para alternar entre vista de lista y cuadricula
    const toggleViewMode = () => {
    setViewMode(viewMode === 'lista' ? 'cuadricula' : 'lista');
    };
    return (
    <div className="cuerpoo">
        {/* Video destacado */}
        <article className="seccionesvideo">
            <video className="vid" src="src/video/aquavision.mp4" autoPlay loop muted></video>
            <div className='vajovideo'></div>
        </article>

        {/* Top de categorías */}
        <article className="seccionescuerpo">
            <div className=" titulosdecategoruas">
                <h2 >Top de categorías</h2> 
            </div>
            
            <div className="tutilocatego">
                <div className="imagendest">
                    <img className="imgdest"  src="../../../public/img/img5.png" alt="" />
                </div>
                <div className="textodecategorias">Categoría <br/> # Entradas</div>
            </div>
            <div className="tutilocatego2">
                <div className="imagendest">
                    <img className="imgdest"  src="../../../public/img/img5.png" alt="" />
                </div>
                <div className="textodecategorias">Categoría <br/> # Entradas</div>
            </div>
            <div className="tutilocatego3">
                <div className="imagendest">
                    <img className="imgdest"  src="../../../public/img/img5.png" alt="" />
                </div>
                <div className="textodecategorias">Categoría <br/> # Entradas</div>
            </div>
        </article>

        {/* Últimas entradas */}
        <article className={`seccionescuerpoultima ${viewMode}-container`}>
            <div className=" titulosdecategoruas">
                <h2 >Últimas entradas</h2> 
                <button className='listacuador' onClick={toggleViewMode}>
                Cambiar vista a {viewMode === 'lista' ? 'Cuadricula' : 'Lista'}
                </button>
            </div>
                <div className="ultimasentradas-container">
                    <div className="ultimasentradas">
                        <div className="categoria-seleccionada">
                            <img className="catimg" src="../../../public/img/img5.png" alt="" />
                        </div>
                        <div className="contenido-entrada">
                            <div className="metaentrada">Nombre del creador - Fecha de publicación</div>
                            <div className="tituloentrada">Título de Entrada</div>
                            <div className="descripcionentrada">Descripción</div>
                        </div>
                    </div>
                    <div className="ultimasentradas">
                        <div className="categoria-seleccionada2">
                            <img className="catimg" src="../../../public/img/img5.png" alt="" />
                        </div>
                        <div className="contenido-entrada">
                            <div className="metaentrada">Nombre del creador - Fecha de publicación</div>
                            <div className="tituloentrada">Título de Entrada</div>
                            <div className="descripcionentrada">Descripción</div>
                        </div>
                    </div>
                    <div className="ultimasentradas">
                        <div className="categoria-seleccionada3">
                            <img className="catimg" src="../../../public/img/img5.png" alt="" />
                        </div>
                        <div className="contenido-entrada">
                            <div className="metaentrada">Nombre del creador - Fecha de publicación</div>
                            <div className="tituloentrada">Título de Entrada</div>
                            <div className="descripcionentrada">Descripción</div>
                        </div>
                    </div>
                </div>
                <div className='mosrarmasyvav'>
                    <nav className="paginacion">
                        <span className="pagina">1</span>
                        <span className="pagina">2</span>
                        <span className="pagina">3</span>
                    </nav>
                    <button className='mostarmas'> mostar mas</button>
                </div>
        </article>



        {/* Recursos Multimedia */}
        <article className="seccionescuerporecursos">
        <div className=" titulosdecategoruas">
                <h2 >Recursos Multimedia</h2> 
            </div>
            <div className="recurso">
                <div className="imagen-recurso">Infografía</div>
            </div>
            <div className="recurso">
                <div className="imagen-recurso">Video</div>
            </div>
            <div className="recurso">
                <div className="imagen-recurso">Video</div>
            </div>
        </article>

        {/* Quizz */}
        <article className="seccionescuerpoquizz">
        <div className=" titulosdecategoruas">
                <h2 >Quizz</h2> 
            </div>
            <div className="contenedor-quizz">
                <div className="logo-quizz">
                    <img src="../../../public/img/quizz.png" alt="" />
                </div>  
                <button className="boton-quizz" onClick={() => window.open("/quizz", "_blank")}>Presiona para empezar</button>
            </div>
        </article>
    </div>
    );
}

export default Cuerpo