import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/categoriaview.css";
import Footer from "../Elements/Footer.jsx";
import Encabezado2 from "./encabezado2.jsx";
import { BaseUrl } from "../../constants/global";
import { useNavigate } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";

function CategoriaView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const { id } = useParams();
  const [color, setColor] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [categoria, setCategoria] = useState("");
  const toggleViewEntrada = (idCategoria) => {
    // alert(idCategoria);
    // setIdCategoria(idCategoria);
    navigate(`/blog-post/${idCategoria}`);
  };
  const [entradas, setEntradas] = useState([]);
  const colorMap = {
    "#fccb00": "yellow-400",
    "#008b02": "green-600 text-neutral-100",
    "#db3e00": "orange-700 text-neutral-100",
    "#b80000": "red-700 text-neutral-100",
    "#1273de": "blue-500 text-neutral-100",
    "#006b76": "cyan-700 text-neutral-100",
    "#5300eb": "violet-700 text-neutral-100",
    "#004dcf": "blue-700 text-neutral-100",
    "#fad0c3": "red-200",
    "#eb9694": "red-300",
    "#c1e1c5": "green-200",
    "#fef3bd": "yellow-100",
    "#bed3f3": "blue-200",
    "#c4def6": "blue-300",
    "#bedadc": "blueGray-300",
    "#d4c4fb": "purple-300",
  };
  const colorClass = colorMap[color[categoria]] || "cyan-400";
  // Obtiene los entradas en la tabla (GET)
  useEffect(() => {
    // alert(BaseUrl + `/api/entradas/bycategory/${id}`);
    const fetchData = async () => {
      try {
        const response = await fetch(
          BaseUrl + `/api/entradas/bycategory/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
      <article className="categoriasdestacada">
        {entradas.length > 0 ? (
          <div
            className="h-40 flex items-center justify-center"
            style={{
              backgroundColor: entradas[0].color,
              color: calcularContraste(entradas[0].color),
            }}
          >
            <div className="text-center">
              <div className="font-bold text-2xl animate-bounce">
                {entradas[0].nombrecategoria}
              </div>
              <div className="italic">{entradas[0].descripcioncategoria}</div>
            </div>
          </div>
        ) : (
          <div>No existen entradas publicadas en la categoría</div>
        )}
      </article>

      <article className="m-10">
        <div className="titulosdecategoruas font-bold">
          {" "}
          <FormattedMessage
            id="index.blogPost"
            defaultMessage="Comment created successfully."
          />
        </div>
        <div className="flex flex-wrap justify-center">
          {entradas.length > 0 ? (
            entradas.map((entrada) => (
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
            ))
          ) : (
            <div>No existen entradas publicadas en la categoría</div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default CategoriaView;
