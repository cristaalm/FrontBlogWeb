import React, { useState } from 'react';
import "../../css/entradasvew.css"; 
import Encabezado from './encabezado';
import Footer from '../Elements/Footer';

const Entradasview = () => {
    const [nombre, setNombre] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí manejarías la lógica para publicar el comentario
        console.log(nombre, comentario);
        // Luego limpiarías los estados
        setNombre('');
        setComentario('');
    };

    return (
        <div className='cont'>
            <Encabezado />
            <article className="preview-de-contenido">
                {/* Contenido del primer artículo si es necesario */}
            </article>
            <article className="contenido-de-comentarios">
                <div className="cont-titulo">
                    <h2>Comentarios:</h2>
                </div>
                <form onSubmit={handleSubmit} className="contenedor-nombres-y-estrellas">
                    <div className="input-area">
                        <input 
                            className="insert-nombre" 
                            type="text" 
                            placeholder="Nombre del visitante"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <div className="rating">
                            {/* Componente de estrellas aquí, si tienes uno */}
                            ★★★★★
                        </div>
                        <textarea 
                            className="dest-coment" 
                            placeholder="Descripción del comentario"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        ></textarea>
                        <div className='contenedor-botn-public'>
                        <button className="publicar-coment" type="submit">Publicar comentario</button>
                        </div>
                    </div>
                </form>
                <div className="posted-comments">
                    <div className='contenedor-comentario-public'>
                        <div className='nomnre-y-fecha'>
                            <h5> nombre completo del visitante- fecha de publicacion</h5>
                        </div>
                        <div className='contendero-de-descriccion'>
                            descriccion dek comentario
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
        </div>
    );
}

export default Entradasview;
