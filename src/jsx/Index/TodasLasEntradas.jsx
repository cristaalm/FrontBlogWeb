import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/categoriaview.css";
import Footer from "../Elements/Footer.jsx";
import Encabezado2 from "./encabezado2.jsx";
import { BaseUrl } from "../../constants/global.js";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FormattedMessage } from "react-intl";

function TodasLasEntradas() {
  const [entradas, setEntradas] = useState([]);
  const [color, setColor] = useState("");
  const [categoria, setCategoria] = useState("");
  // Obtiene los entradas en la tabla (GET)
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + "/api/entradas/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEntradas(data);
        paginatePost("#listaEntradas", 2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cuerpo">
      <Encabezado2 />
      {/* Contenido */}
      <article className="m-10">
        <div className="titulosdecategoruas font-bold">
          {" "}
          <FormattedMessage id="index.blogPost" defaultMessage="blogPost" />
        </div>
        <div id="listaEntradas" className="flex flex-wrap justify-center">
          {entradas &&
            entradas
              .sort(
                (a, b) =>
                  new Date(b.fechapublicacion) - new Date(a.fechapublicacion)
              ) // Ordenar por fecha de forma descendente
              .map((entrada) => (
                <div
                  key={entrada.id}
                  className="ultimasentradas-container lista-view "
                >
                  {/* <div className="ultimasentradas-container"></div> */}
                  <div
                    onClick={() => toggleViewEntrada(entrada.id)}
                    key={entrada.id}
                    className="ultimasentradas rounded-md text-cyan-950 hover:text-yellow-50 cursor-pointer lista-view"
                  >
                    <div className="">
                      <img
                        className="catimg rounded-md lista-view max-w-48 min-w-48"
                        src={entrada.imgdestacada}
                        alt={"Imagen Destacada de entrada " + entrada.id}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      {/* style="width: 100%; height: 200px; object-fit: cover;" */}
                    </div>
                    <div className="contenido-entrada font-medium">
                      <div className="metaentrada">
                        {entrada.nombre} -{" "}
                        {format(
                          new Date(
                            entrada.fechapublicacion + "T00:00:00-06:00"
                          ),
                          "dd/MM/yyyy"
                        )}{" "}
                      </div>
                      <div className="tituloentrada">
                        {/* <div className="font-bold text-2xl mb-2"> */}
                        {entrada.titulo}
                      </div>
                      <div className="descripcionentrada italic list-view">
                        {entrada.descripcion}
                      </div>
                      <span
                        style={{
                          backgroundColor: entrada.color,
                          color: calcularContraste(entrada.color),
                        }}
                        className="text-sm p-1 pl-4 pr-4 rounded-full font-medium"
                      >
                        {entrada.nombrecategoria}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          {!entradas && (
            <div>No existen entradas publicadas en la categoría</div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default TodasLasEntradas;
