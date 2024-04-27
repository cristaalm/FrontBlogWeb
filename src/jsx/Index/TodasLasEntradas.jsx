import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/categoriaview.css";
import Footer from "../Elements/Footer.jsx";
import Encabezado2 from "./encabezado2.jsx";
import { BaseUrl } from "../../constants/global.js";
import { useNavigate } from "react-router-dom";

function TodasLasEntradas() {

  const [entradas, setEntradas] = useState([]);

  // Obtiene los entradas en la tabla (GET)
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + "/api/entradas/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEntradas(data);
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
        <div className="titulosdecategoruas font-bold">Blog Post</div>
        <div className="flex flex-wrap justify-center">
          {entradas.data &&
            entradas.data.map((entrada) => (
              <div
                key={entrada.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2"
              >
                <div className="ultimasentradas-container"></div>
                <div
                  onClick={() => toggleViewEntrada(entrada.id)}
                  key={entrada.id}
                  className="ultimasentradas rounded-md text-cyan-950 hover:text-yellow-50 cursor-pointer"
                >
                  <div className="categoria-seleccionada">
                    <img
                      className="catimg rounded-md lista-view max-w-48 min-w-48"
                      src={entrada.imgdestacada}
                      alt={"Imagen Destacada de entrada " + entrada.id}
                      style={{
                        width: "400px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="contenido-entrada font-medium">
                    <div className="font-bold text-2xl mb-2">
                      {entrada.titulo}
                    </div>
                    <div>{entrada.descripcion}</div>
                  </div>
                </div>
              </div>
            ))}
          {!entradas.data && (
            <div>No existen entradas publicadas en la categoría</div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default TodasLasEntradas;
