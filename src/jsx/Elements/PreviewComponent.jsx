import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../constants/global";
import { Tooltip } from "react-tooltip";

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

import { Link, Unlink, Mail, Twitter, Facebook } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  // Link,
  // Facebook,
  TwitterX,
  Mailbox,
  // Twitter,
} from "react-bootstrap-icons";
import { Height } from "@mui/icons-material";

const PreviewComponent = () => {
  const { id } = useParams();
  const [contenidoTiny, setContenidoTiny] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categoryNames, setCategoryNames] = useState("");
  const [tituloEntrada, setTituloEntrada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreCompleto, setNombre] = useState("");
  const [fPublicacion, setFPublicacion] = useState("");
  const [color, setColor] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + `/api/entradas/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        window.scrollTo(0, 0);
        setContenidoTiny(data.contenido);
        setTituloEntrada(data.titulo);
        setCategoria(data.idcategoria);
        setDescripcion(data.descripcion);
        setFPublicacion(data.fechapublicacion);
        setNombre(data.nombre);
        setPreviewImage(data.imgdestacada);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + `/api/categories/${categoria}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        if (data !== null) {
          const names = {};
          const color = {};
          if (Array.isArray(data)) {
            // Data is an array
            data.forEach((category) => {
              names[category.id] = category.nombre;
              color[category.id] = category.color;
            });
          } else {
            names[data.id] = data.nombre;
            color[data.id] = data.color;
          }
          setCategoryNames(names);
          setColor(color);
        } else {
          console.error("No data received for categories");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categoria]); // Added `categoria` as a dependency to re-fetch data when `categoria` changes
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
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
  if (error) {
    navigateTo("/error");
  }

  const colorClass = colorMap[color[categoria]] || "cyan-400";
  let colorLetra = calcularContraste(color[categoria]);
  const copiarAlPortapapeles = (e) => {
    e.preventDefault();
    const enlace = `http://localhost:5173/welcome#/blog-post/${id}`;
    navigator.clipboard
      .writeText(enlace)
      .then(() => {
        alert("Enlace copiado al portapapeles: " + enlace);
      })
      .catch((err) => {
        console.error("Error al copiar el enlace: ", err);
      });
  };
  return (
    <div>
      <div className="bg-yellow-400 bg-green-600 text-neutral-100 bg-orange-700 bg-red-700 text-neutral-100 bg-blue-500 bg-cyan-700 bg-violet-700 bg-blue-700 bg-red-200 bg-red-300 bg-green-200 bg-yellow-100 bg-blue-200 bg-blue-300 bg-blueGray-300 bg-purple-300"></div>

      <div className="hover:text-yellow-400 hover:text-green-600 hover:text-orange-700 hover:text-red-700 hover:text-blue-500 hover:text-cyan-700 hover:text-violet-700 hover:text-blue-700 hover:text-red-200 hover:text-red-300 hover:text-green-200 hover:text-yellow-100 hover:text-blue-200 hover:text-blue-300 hover:text-blueGray-300 hover:text-purple-300 text-neutral-100"></div>

      <div className="flex flex-row select-none">
        <div className="basis-2/3">
          <span
            style={{ backgroundColor: color[categoria], color: colorLetra }}
            className={`bg-${colorClass} text-sm p-1 pl-4 pr-4 rounded-full font-medium`}
          >
            {categoryNames[categoria]}
          </span>

          <h1 className="font-bold text-5xl py-1 text-cyan-950">
            {tituloEntrada}
          </h1>
          <div className="flex">
            {/* <div className="flex" style={{ height: "100px" }}> */}{" "}
            <div className="flex items-end">
              <img
                src="/img/logo.png"
                alt="Preview"
                className="mt-2 w-14 h-14"
              />
              <div className="ml-4 text-cyan-950 font-medium">
                <p className="mb-0">{nombreCompleto}</p>
                <p className="mb-0">
                  {fPublicacion
                    ? format(
                        new Date(`${fPublicacion}T00:00:00-06:00`),
                        "dd/MM/yyyy"
                      )
                    : "No hay fecha"}
                </p>
              </div>
            </div>
            <Tooltip
              id="tooltip"
              style={{ backgroundColor: color[categoria], color: colorLetra }}
            />
            <div className="flex items-end ml-auto mb-2">
              <div className="flex justify-center space-x-4">
                <a
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Copiar enlace"
                  className="cursor-pointer"
                  // href={`http://localhost:5173/post/preview/${id}`}
                  onClick={copiarAlPortapapeles}
                >
                  <Link
                    style={{ color: isHovered ? color[categoria] : undefined }}
                    className="text-teal-600 transition-transform transform hover:scale-110"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                </a>
                <FacebookShareButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Facebook"
                  url={`http://localhost:5173/#/post/preview/${id}`}
                  quote="Check out this amazing content!"
                  hashtag="#react"
                >
                  <Facebook
                    style={{ color: isHovered2 ? color[categoria] : undefined }}
                    className="text-teal-600 transition-transform transform hover:scale-110"
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Twitter"
                  url={`http://localhost:5173/#/post/preview/${id}`}
                  title="My awesome article"
                >
                  <TwitterX
                    size={20}
                    style={{ color: isHovered3 ? color[categoria] : undefined }}
                    className="text-teal-600 transition-transform transform hover:scale-110"
                    onMouseEnter={() => setIsHovered3(true)}
                    onMouseLeave={() => setIsHovered3(false)}
                  />
                </TwitterShareButton>
                <EmailShareButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Email"
                  url={`http://localhost:5173/#/post/preview/${id}`}
                  subject="Don't miss this!"
                  body="This is a must-read!"
                >
                  <Mail
                    style={{ color: isHovered4 ? color[categoria] : undefined }}
                    className="text-teal-600 transition-transform transform hover:scale-110"
                    onMouseEnter={() => setIsHovered4(true)}
                    onMouseLeave={() => setIsHovered4(false)}
                  />
                </EmailShareButton>
              </div>
            </div>
          </div>
        </div>

        <div className="basis-1/3 flex items-center justify-center">
          <img
            src={previewImage}
            alt="Preview"
            className="mt-2 w-full h-full max-h-48 px-3"
          />
        </div>
      </div>
      <hr></hr>
      <p className="text-sm italic mt-2">Descripción: {descripcion}</p>
      <div
        className="contenidoTiny mt-4"
        dangerouslySetInnerHTML={{ __html: contenidoTiny }}
      ></div>
    </div>
  );
};

export default PreviewComponent;
