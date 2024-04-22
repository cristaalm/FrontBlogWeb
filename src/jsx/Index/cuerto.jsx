import React, { useContext, useEffect, useState } from "react";
import "../../css/cuerpo.css";
import { Tooltip } from "react-tooltip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import { ListCollapse, Grid2X2 } from "lucide-react";
import VideoPopup from "../Elements/M&Rmodal"; // Importa el componente del modal
import ImagePopup from "../Elements/M&Rmodal";
import { format } from "date-fns";
import "../../css/mrmodal.css";
import { EngineeringTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../constants/global";
const Cuerpo = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("lista");
  const [isListView, setIsListView] = useState(true);
  const [videoSrc, setVideoSrc] = useState(""); // Estado para la URL del video seleccionado
  const [showVideoModal, setShowVideoModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [imageSrc, setImageSrc] = useState(""); // Estado para la URL de la imagen seleccionada
  const [showImageModal, setShowImageModal] = useState(false); // Estado para controlar la visibilidad del modal de imagen

  const [contenidoTiny, setContenidoTiny] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [tituloEntrada, setTituloEntrada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreCompleto, setNombre] = useState("");
  const [fPublicacion, setFPublicacion] = useState("");
  const [color, setColor] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [entradas, setEntradas] = useState([]);

  //1. Declaro una variable para que se obtenga mi contenido de entradas

// Obtiene los entradas en la tabla (POST)
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(BaseUrl + "/api/entradas/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEntradas(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(BaseUrl + "/api/categories/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategoria(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);


  // useEffect(() => {
  //   console.log(entradas)
  //   if (entradas.data && entradas.data.length > 0) {
  //     // Filtrar por estado "Publicado" después de recibir los datos
  //     const entradasPublicadas = entradas.data.filter(
  //       (entrada) => entrada.estatus === "Publicado"
  //     );
  //     console.log(entradasPublicadas); // Muestra las entradas publicadas en la consola
  //   } else {
  //     console.log("no hay nada");
  //   }
  // }, [entradas]);

  const changeToListView = () => {
    setIsListView(true);
    setViewMode("lista");
  };

  const changeToGridView = () => {
    setViewMode("cuadricula");
    setIsListView(false);
  };

  const intl = useIntl();

  const listViewTooltip = intl.formatMessage({
    id: "iTndex.list",
    defaultMessage: "List",
  });

  const gridViewTooltip = intl.formatMessage({
    id: "index.grid",
    defaultMessage: "Grid",
  });

  const openVideoModal = (src) => {
    setVideoSrc(src);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setVideoSrc("");
    setShowVideoModal(false);
  };

  const openImageModal = (src) => {
    setImageSrc(src);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setImageSrc("");
    setShowImageModal(false);
  };
  const toggleViewEntrada = (id) => {
    // alert(id);
    navigate(`/blog-post/${id}`);
  };
  const togglecategorie = (id) => {
    // alert(id);
    navigate(`/categories/${id}`);
  };

  return (
    <div className="cuerpoo">
      {/* Video destacado */}
      <article id="welcome" className="seccionesvideo">
        <video
          className="vid"
          src="src/video/without.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="vajovideo"></div>
      </article>

      {/* Top de categorías */}
      <article className="seccionescuerpo">
        <div className="titulosdecategoruas font-bold">
          <FormattedMessage
            id="index.Top-categories"
            defaultMessage="Top categories"
          />
        </div>
        {categoria.data && 
        categoria.data.map((category) => (
        <div
        onClick={() => togglecategorie(category.id)}
        key={category.id} 
        className="tutilocatego cursor-pointer">
          <div className="imagendest">
            <div className="numero font-semibold" style={{ backgroundColor: category.color }} >#{category.id}</div>
            <img
              className="imgdest rounded-md"
              src={category.imgdestacada}
              alt=""
            />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8  rounded-full mr-4" style={{ backgroundColor: category.color }} > </div>{" "}
            {/* Circulo de color obtenido*/}
            <div className="categorias flex flex-col leading-tight">
              <div>
                <span className="mr-2 font-semibold">{category.descripcion}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-sm"># Entradas</span>
              </div>
            </div>
          </div>
        </div>
              ))}
        {/* <div className="tutilocatego cursor-pointer">
          <div className="imagendest">
            <div className="numero bg-pink-400 font-semibold">#2</div>
            <img
              className="imgdest rounded-md"
              src="../../../public/img/img5.png"
              alt=""
            />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-400 rounded-full mr-4"></div>{" "}
            
            <div className="categorias flex flex-col leading-tight">
              <div>
                <span className="mr-2 font-semibold">Categoría</span>
              </div>
              <div>
                <span className="text-zinc-500 text-sm"># Entradas</span>
              </div>
            </div>
          </div>
        </div>
        <div className="tutilocatego cursor-pointer">
          <div className="imagendest">
            <div className="numero bg-lime-400 font-semibold">#3</div>
            <img
              className="imgdest"
              src="../../../public/img/img5.png"
              alt=""
            />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-lime-400 rounded-full mr-4"></div>{" "}
            
            <div className="categorias flex flex-col leading-tight">
              <div>
                <span className="mr-2 font-semibold">Categoría</span>
              </div>
              <div>
                <span className="text-zinc-500 text-sm"># Entradas</span>
              </div>
            </div>
          </div>
        </div> */}
      </article>
      {/* Últimas entradas */}
      <article id="ultima-entrada" className="seccionescuerpoultima font-bold">
        <div
          className={`ultimasentradas-container titulosdecategoruas ${viewMode}`}
        >
          <FormattedMessage
            id="index.Last-entries"
            defaultMessage="Last entries"
          />
          <div className="contenedorbotoneslistacuad">
            <Tooltip
              id="lista"
              className="font-normal"
              style={{
                padding: "10px",
                fontSize: "15px",
                backgroundColor: "#035165",
                color: "#fffdee",
                zIndex: "999",
              }}
            />
            <Tooltip
              id="cuadricular"
              className="font-normal"
              style={{
                padding: "10px",
                fontSize: "15px",
                backgroundColor: "#035165",
                color: "#fffdee",
                zIndex: "999",
              }}
            />
            <ButtonGroup variant="contained" className="cursor-pointer">
              <Button
                onClick={changeToListView}
                className={isListView ? "button-selected" : "button-normal"} // Aplicar estilo según el estado
                data-tooltip-id="lista"
                data-tooltip-place="top"
                data-tooltip-content={listViewTooltip} //implementas la funcion aqui
              >
                <ListCollapse />
              </Button>
              <Button
                onClick={changeToGridView}
                className={!isListView ? "button-selected" : "button-normal"} // Aplicar estilo según el estado
                data-tooltip-id="cuadricular"
                data-tooltip-place="top"
                data-tooltip-content={gridViewTooltip} //implementas la funcion aqui
              >
                <Grid2X2 />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div
          className={`ultimasentradas-container  ${
            viewMode === "lista"
              ? "lista-view"
              : "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {entradas &&
            entradas
              // .filter((entrada) => entrada.estatus == "Publicado") // Filtrar por estado "Publicado"
              .sort(
                (a, b) => new Date(b.fechapublicacion) - new Date(a.fechapublicacion)
              ) // Ordenar por fecha de forma descendente
              .slice(0, 4) // Tomar las últimas 4 entradas
              .map((entrada) => (
                <div
                  key={entrada.id}
                  onClick={() => toggleViewEntrada(entrada.id)}
                  className={`ultimasentradas rounded-md text-cyan-950 hover:text-yellow-50 cursor-pointer ${
                    viewMode === "lista" ? "lista-view" : ""
                  }`}
                >
                  <div
                    className={`categoria-seleccionada ${
                      viewMode === "lista" ? "lista-view" : ""
                    }`}
                  >
                    <img
                      className={`catimg rounded-md  ${
                        viewMode === "lista"
                          ? "lista-view max-w-48 min-w-48"
                          : ""
                      }`}
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
                    <div
                      className={`metaentrada ${
                        viewMode === "lista" ? "lista-view" : ""
                      }`}
                    >
                      {entrada.usuario} -{" "}
                      {format(new Date(entrada.fechapublicacion), "dd/MM/yyyy")}
                    </div>
                    <div
                      className={`tituloentrada ${
                        viewMode === "lista" ? "lista-view" : ""
                      }`}
                    >
                      {entrada.titulo}
                    </div>
                    <div
                      className={`descripcionentrada italic ${
                        viewMode === "lista" ? "lista-view" : ""
                      }`}
                    >
                      {entrada.descripcion}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="mosrarmasyvav">
          {/* <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup> */}
          <button className="mostarmas">
            {" "}
            <FormattedMessage id="btn.showMore" defaultMessage="Show more" />
          </button>
        </div>
      </article>
      {/* Recursos Multimedia */}
      <article id="recursos-multimedia" className="seccionescuerporecursos">
        <div className="titulosdecategoruasbla font-bold">
          <FormattedMessage
            id="index.Multimedia-Resources"
            defaultMessage="Multimedia Resources"
          />
        </div>
        <div className="contenedorrecursos">
          <div
            className="recurso1"
            onClick={() => openVideoModal("src/video/ODS6.mp4")}
          >
            {/* Primer video con evento onClick */}
            <button>
              <video
                className="recurso1-video"
                src="src/video/ODS6.mp4"
                autoPlay
                loop
                muted
              ></video>
            </button>
          </div>
          <div className="recurso2">
            {/* Segunda imagen con evento onClick */}
            <button
              onClick={() => openImageModal("../../../public/img/ODS66.jpg")}
            >
              <img
                className="recurso2-video"
                src="../../../public/img/ODS6.gif"
                alt="Imagen de recurso"
              />
            </button>
          </div>
          <div className="recurso3">
            {/* Tercer video con evento onClick */}
            <button onClick={() => openVideoModal("src/video/text.mp4")}>
              <video
                className="recurso3-video"
                src="src/video/text.mp4"
                autoPlay
                loop
                muted
              ></video>
            </button>
          </div>
        </div>
      </article>

      {/* Modal */}
      {showVideoModal && (
        <VideoPopup src={videoSrc} onClose={closeVideoModal} />
      )}
      {showImageModal && (
        <ImagePopup src={imageSrc} type="image" onClose={closeImageModal} />
      )}
      {/* Quizz */}
      <article id="quizz" className="seccionescuerpoquizz p-10 relative">
        <div className="titulosdecategoruas font-bold">
          <FormattedMessage id="index.quizz" defaultMessage="Quizz" />
        </div>
        <div className="contenedor-quizz drop-shadow-md relative">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            src="src/video/aguaBG.mp4"
            type="video/mp4"
            autoPlay
            loop
            muted
          />
          <div className="logo-quizz z-50">
            <img
              src="../../../public/img/quizz.png"
              alt="Quizz img"
              className="m-0 p-0 w-40 h-40"
            />
          </div>
          <button
            className="boton-quizz mr-10 text-green-100 animate-pulse scale-125"
            onClick={() => window.open("/quizz", "_blank")}
          >
            <FormattedMessage
              id="index.pressStart"
              defaultMessage="Press to start"
            />
          </button>
        </div>
      </article>
    </div>
  );
};

export default Cuerpo;
