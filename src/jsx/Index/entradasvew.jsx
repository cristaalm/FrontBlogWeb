import React, { useState, useRef, useEffect } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import "../../css/entradasvew.css";
import Footer from "../Elements/Footer";
import PreviewComponent from "../Elements/PreviewComponent.jsx";
import { useParams } from "react-router-dom";
import { createComment } from "../../js/createComment";
import { format } from "date-fns";
import { BaseUrl } from "../../constants/global";
import Carrusel from '../Elements/carrusel.jsx';
import Encabezado2 from "./encabezado2.jsx";

const Entradasview = ({ intl }) => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);
  const [idEntrada, setIdEntrada] = useState("");

  const [comments, setComments] = useState([]);
  const [reloadComments, setReloadComments] = useState(false);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const topRef = useRef(null); // Referencia al elemento en la parte superior

  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave al montar el componente
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre && rating && comentario) {
      try {
        await createComment(nombre, rating, comentario, id);
        setMessage(
          <FormattedMessage
            id="msg.commentSuccess"
            defaultMessage="Comment created successfully."
          />
        );
        setMessageClass("success");
        setNombre("");
        setComentario("");
        setRating(0);
        setReloadComments(true); // Activar recarga de comentarios
      } catch (error) {
        console.error("Post creation failed:", error);
        setMessage("An error occurred while creating the post");
        setMessageClass("error");
      }
    } else {
      setMessage(
        <FormattedMessage
          id="msg.completeFields"
          defaultMessage="Please complete all fields"
        />
      );
      setMessageClass("error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + `/api/comments/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.log("No hay comentarios aún");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComments(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reloadComments]); // Dependencia para recargar comentarios

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const namevist = intl.formatMessage({
    id: "index.Visitor's.name",
    defaultMessage: "Visitor's name",
  });
  const CommentDescription = intl.formatMessage({
    id: "index.Comment-Description",
    defaultMessage: "Comment Description",
  });
  const renderStars = (total) => {
    const stars = [];
    for (let i = 1; i <= total; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          style={{
            cursor: "pointer",
            fontSize: "3rem",
            color: i <= rating ? "#ffc107" : "#0d9488",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-neutral-100">
      <div ref={topRef}></div>{" "}
      {/* Referencia al elemento en la parte superior */}
      <Encabezado2 />
      <article className="preview-de-contenido m-10">
        <PreviewComponent />
      </article>
        <Carrusel />
      <article className="m-10">
        <div className="titulosdecategoruas font-bold">
          <FormattedMessage id="index.comment" defaultMessage="Comments" />
        </div>
        <div className="mb-2">
          {message && (
            <div className={`message ${messageClass}`}>{message}</div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="contenedor-nombres-y-estrellas"
        >
          <div className="input-area ring-2 ring-teal-600 rounded-lg">
            <div className="flex items-center mb-4">
              {" "}
              {/* Contenedor para el input y las estrellas */}
              <input
                className="btnVisitante w-full ring-2 border-b-none bg-neutral-100 p-2 ring-teal-600 rounded p-2 mr-2"
                type="text"
                placeholder={namevist}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <div className="rating">{renderStars(5)}</div>
            </div>
            <textarea
              className="txtComentario w-full p-2 in2 mt-2 ring-2 ring-teal-600 rounded"
              placeholder={CommentDescription}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
            <div className="contenedor-botn-public">
              <button className="entr tracking-widest p-3 mt-4" type="submit">
                <FormattedMessage
                  id="index.Post-comment"
                  defaultMessage="Post comment"
                />
              </button>
            </div>
          </div>
        </form>

        {/* <div className="posted-comments"> */}
          <div className="contenedor-comentario-public mt-4">
            {comments &&
              comments.map((comment) => (
                <div key={comment.id} className="flex items-center border-2 border-neutral-200 shadow-lg shadow-teal-600/20 rounded-2xl mt-6 p-2">
                  <img
                    src="../../../public/img/logo.png"
                    alt="Preview"
                    className="w-20 h-20"
                  />
                  <div className="ml-4">
                    <div className="text-cyan-950 font-semibold text-base">
                      <h5 style={{ display: "flex", alignItems: "center" }}>
                        {comment.nombre}
                        <span style={{ marginLeft: "20px" }}>
                          {[...Array(comment.valoracion)].map((_, index) => (
                            <span
                              key={index}
                              style={{ color: "#ffc107", fontSize: "1.5rem" }}
                            >
                              ★
                            </span>
                          ))}
                          {[...Array(5 - comment.valoracion)].map(
                            (_, index) => (
                              <span
                                key={index + comment.valoracion}
                                style={{ color: "#0d9488", fontSize: "1.5rem" }}
                              >
                                ★
                              </span>
                            )
                          )}
                        </span>
                      </h5>
                      <p className="font-normal text-sm">{format(Date(comment.fechacreacion), "dd/MM/yyyy")}</p>
                    </div>
                    <div className="text-center italic">
                      <p className="mb-0">{comment.descripcion}</p>
                    </div>
                    {/* <hr></hr> */}
                  </div>
                </div>
              ))}
            {comments && comments.length === 0 && <p>No hay comentarios aún</p>}
          </div>
        {/* </div> */}
      </article>
      <Footer />
    </div>
  );
};

export default injectIntl(Entradasview);
