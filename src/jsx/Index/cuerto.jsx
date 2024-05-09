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
import { useNavigate, Link } from "react-router-dom";
import { BaseUrl } from "../../constants/global";
import { Link as RouterLink } from "react-router-dom";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        setColor(data.color);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
    // autoPlay(videoSrc);
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
      <article id="welcome" className="seccionesvideo">
        <video
          className="vid"
          src="public/video/welcomeav.mp4"
          autoPlay
          loop
          muted
          style={{ filter: "brightness(80%)" }}
        ></video>
        <div className="textvideo2">
          <span className="font-bold text-2xl">
            <FormattedMessage
              id="home.welcome"
              defaultMessage="Changing Waters"
            />
          </span>
          <br />
          <FormattedMessage
            id="home.welcome2"
            defaultMessage="Dive into Action: Collaborate, learn, and lead in our community dedicated to water and sanitation. Join us and support the UN's Sustainable Development Goals with every drop."
          />
        </div>

        <div className="ponerAlFinal">
          <div className="wave wave1 wavesHome"></div>
          <div className="wave wave2 wavesHome"></div>
          <div className="wave wave3 wavesHome"></div>
          <div className="wave wave4 wavesHome"></div>
        </div>
      </article>

      {/* Top de categorías */}
      <article className="seccionescuerpo mt-6 font-bold">
        <div className="titulosdecategoruas font-bold">
          <FormattedMessage
            id="index.Top-categories"
            defaultMessage="Top categories"
          />
        </div>
        {categoria.data && categoria.data.length > 0 ? (
          categoria.data
            .sort((a, b) => b.entradas - a.entradas) // Ordenar de mayor a menor por la cantidad de entradas
            .filter((category) => category.entradas > 0) // Filtrar categorías con al menos una entrada
            .map((category, index) => (
              <div
                onClick={() => togglecategorie(category.id)}
                key={category.id}
                className="tutilocatego cursor-pointer"
              >
                <div className="imagendest rounded-lg">
                  <div
                    className="numero font-semibold"
                    style={{
                      backgroundColor: category.color,
                      color: calcularContraste(category.color),
                    }}
                  >
                    #{index + 1}
                  </div>
                  <div
                    className="overlay rounded-lg "
                    style={{
                      backgroundColor: category.color,
                      color: calcularContraste(category.color),
                    }}
                  >
                    <div className="font-bold text-2xl">
                      <FormattedMessage
                        id="hover.entradas"
                        defaultMessage="Show more blog post"
                      />
                    </div>
                  </div>
                  <img
                    className="imgdest rounded-lg"
                    src={category.imgdestacada}
                    alt=""
                  />
                </div>
                <div className="flex items-center">
                  <div
                    className="w-8 h-8  rounded-full mr-4"
                    style={{ backgroundColor: category.color }}
                  >
                    {" "}
                  </div>{" "}
                  {/* Circulo de color obtenido*/}
                  <div className="categorias flex flex-col leading-tight">
                    <div>
                      <span className="mr-2 font-semibold">
                        {category.nombre}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-sm">
                        {category.entradas} Entradas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>No se encontraron categorías con entradas.</div>
        )}
      </article>
      {/* Últimas entradas */}
      <article
        id="ultima-entrada"
        className="seccionescuerpoultima font-bold mt-12"
      >
        <div className="ultimasentradas-container titulosdecategoruas">
          <FormattedMessage
            id="index.Last-entries"
            defaultMessage="Last entries"
          />
          <div className="contenedorbotoneslistacuad"></div>
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
          <div>
            <ButtonGroup variant="contained" className="cursor-pointer ml-auto">
              <Button
                onClick={changeToListView}
                className={isListView ? "button-selected" : "button-normal"}
                data-tooltip-id="lista"
                data-tooltip-place="top"
                data-tooltip-content={listViewTooltip}
              >
                <ListCollapse />
              </Button>
              <Button
                onClick={changeToGridView}
                className={!isListView ? "button-selected" : "button-normal"}
                data-tooltip-id="cuadricular"
                data-tooltip-place="top"
                data-tooltip-content={gridViewTooltip}
              >
                <Grid2X2 />
              </Button>
            </ButtonGroup>
            <Link to="/all-the-blogpost">
              <button className="mostarmas font-semibold shadow-md text-lg bg bg-cyan-650 rounded float-right">
                <FormattedMessage
                  id="btn.showMore"
                  defaultMessage="Show more"
                />
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-yellow-400 bg-green-600 text-neutral-100 bg-orange-700 bg-red-700 text-neutral-100 bg-blue-500 bg-cyan-700 bg-violet-700 bg-blue-700 bg-red-200 bg-red-300 bg-green-200 bg-yellow-100 bg-blue-200 bg-blue-300 bg-blueGray-300 bg-purple-300"></div>

        <div className="hover:text-yellow-400 hover:text-green-600 hover:text-orange-700 hover:text-red-700 hover:text-blue-500 hover:text-cyan-700 hover:text-violet-700 hover:text-blue-700 hover:text-red-200 hover:text-red-300 hover:text-green-200 hover:text-yellow-100 hover:text-blue-200 hover:text-blue-300 hover:text-blueGray-300 hover:text-purple-300 text-neutral-100"></div>
        <div
          className={`ultimasentradas-container  ${
            viewMode === "lista"
              ? "lista-view"
              : "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {entradas && entradas.length > 0 ? (
            entradas
              // .filter((entrada) => entrada.estatus == "Publicado") // Filtrar por estado "Publicado"
              .sort(
                (a, b) =>
                  new Date(b.fechapublicacion) - new Date(a.fechapublicacion)
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
                        width: "100%",
                        height: "200px",
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
                      {entrada.nombre} -{" "}
                      {format(
                        new Date(entrada.fechapublicacion + "T00:00:00-06:00"),
                        "dd/MM/yyyy"
                      )}{" "}
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
                        viewMode === "lista" ? "lista-view" : "hidden"
                      }`}
                    >
                      {entrada.descripcion}
                    </div>
                    <span
                      style={{
                        backgroundColor: entrada.color,
                        color: calcularContraste(entrada.color),
                      }}
                      className="text-sm p-1 object-bottom pl-4 pr-4 rounded-full font-medium"
                    >
                      {entrada.nombrecategoria}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <div>No se encontraron entradas.</div>
          )}
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
            onClick={() => openVideoModal("/video/ODS6.mp4")}
          >
            {/* Primer video con evento onClick */}
            <button>
              <div className="recurso3-overlay font-bold text-2xl">
                <FormattedMessage
                  id="hover.video"
                  defaultMessage="Show video"
                />
              </div>

              <video
                className="recurso1-video"
                src="/video/ODS6.mp4"
                autoPlay
                loop
                muted
              ></video>
            </button>
          </div>
          <div className="recurso2">
            {/* Segunda imagen con evento onClick */}
            <button onClick={() => openImageModal("/img/ODS66.jpg")}>
              <div className="recurso3-overlay font-bold text-2xl">
                <FormattedMessage
                  id="hover.infografia"
                  defaultMessage="Show infographic"
                />
              </div>

              <img
                className="recurso2-video"
                src="/img/ODS6.gif"
                alt="Imagen de recurso"
              />
            </button>
          </div>
          <div className="recurso3">
            {/* Tercer video con evento onClick */}
            <button onClick={() => openVideoModal("/video/text.mp4")}>
              <div className="recurso3-overlay font-bold text-2xl">
                <FormattedMessage
                  id="hover.video"
                  defaultMessage="Show video"
                />{" "}
              </div>
              <video
                className="recurso3-video"
                src="/video/text.mp4"
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
            src="/video/aguaBG.mp4"
            type="video/mp4"
            autoPlay
            loop
            muted
          />
          <div className="logo-quizz z-50">
            <img
              src="/img/quizz.png"
              alt="Quizz img"
              className="m-0 p-0 w-40 h-40"
            />
          </div>
          <RouterLink to="/quizz">
            <button className="boton-quizz mr-10 text-green-100 animate-pulse scale-125">
              <FormattedMessage
                id="index.pressStart"
                defaultMessage="Press to start"
              />
            </button>
          </RouterLink>
        </div>
      </article>
    </div>
  );
};

export default Cuerpo;
