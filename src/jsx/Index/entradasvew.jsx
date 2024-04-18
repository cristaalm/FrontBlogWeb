import React, { useState } from "react";
import "../../css/entradasvew.css";
import Encabezado from "./encabezado";
import Footer from "../Elements/Footer";
import PreviewComponent from "../Elements/PreviewComponent.jsx";
import { useParams } from "react-router-dom";

const Entradasview = () => {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica para publicar el comentario
    console.log(nombre, comentario, rating);
    // Luego limpiarías los estados
    setNombre("");
    setComentario("");
    setRating(0);
  };

  const renderStars = (total) => {
    const stars = [];
    for (let i = 1; i <= total; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          style={{ cursor: 'pointer', fontSize: '3rem', color: i <= rating ? '#ffc107' : '#e4e5e9' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-neutral-100">
      <Encabezado />
      <article className="preview-de-contenido m-10">
        <PreviewComponent />
      </article>
      <article className="m-10">
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
                className="btnVisitante w-full ring-2 border-b-none bg-neutral-100 p-2 ring-teal-600 rounded p-2 mr-2"
                type="text"
                placeholder="Nombre del visitante"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <div className="rating" >
                {renderStars(5) }
              </div>
            </div>
            <textarea
              className="txtComentario w-full p-2 in2 mt-2 ring-2 ring-teal-600 rounded"
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
