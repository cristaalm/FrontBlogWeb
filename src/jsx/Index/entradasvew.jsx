import React, { useState } from "react";
import "../../css/entradasvew.css";
import Encabezado from "./encabezado";
import Footer from "../Elements/Footer";

const Entradasview = () => {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica para publicar el comentario
    console.log(nombre, comentario);
    // Luego limpiarías los estados
    setNombre("");
    setComentario("");
  };

  return (
    <div className="cont">
      <Encabezado />
      <article className="preview-de-contenido">
        {/* Contenido del primer artículo si es necesario */}
      </article>
      <article className="contenido-de-comentarios">
        <div className="titulosdecategoruas font-bold">
          <h2>Comentarios:</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="contenedor-nombres-y-estrellas"
        >
          <div className="input-area">
            <div className="flex items-center mb-4">
              {" "}
              {/* Contenedor para el input y las estrellas */}
              <input
                className="w-full p-2 in2 mr-2"
                type="text"
                placeholder="Nombre del visitante"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <div className="rating">
                {/* Componente de estrellas aquí, si tienes uno */}
                ★★★★★
              </div>
            </div>
            <textarea
              className="w-full p-2 in2 mt-2 ring-2 ring-teal-600 rounded"
              placeholder="Descripción del comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
            <div className="contenedor-botn-public">
              <button className="entr tracking-widest p-3 mt-4" type="submit">
                Publicar comentario
              </button>
            </div>
          </div>
        </form>

        <div className="posted-comments">
          <div className="contenedor-comentario-public">
            <div className="nomnre-y-fecha">
              <h5>Nombre completo del visitante - Fecha de publicación</h5>
            </div>
            <div className="contendero-de-descriccion">
              Descripción del comentario
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default Entradasview;
