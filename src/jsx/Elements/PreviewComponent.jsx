import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backblogweb.onrender.com/api/entradas/${id}`,
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
        const { data } = await response.json();
        setContenidoTiny(data.contenido);
        setTituloEntrada(data.titulo);
        setCategoria(data.idcategoria);
        setDescripcion(data.descripcion);
        setFPublicacion(data.fechapublicacion);
        setNombre(data.nombre);
        console.log(data);
        setPreviewImage(data.imgdestacada);
        console.log(data.imgdestacada);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backblogweb.onrender.com/api/categories/${categoria}`,
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
        const { data } = await response.json();
        if (data !== null) {
          const names = {};
          const color = {};
          data.forEach((category) => {
            names[category.id] = category.nombre;
            color[category.id] = category.color;
          });
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
  console.log(color[categoria]);
  const colorClass = colorMap[color[categoria]] || "cyan-400";
  console.log(colorClass);

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-2/3">
          <span
            className={`bg-${colorClass} text-sm p-1 pl-4 pr-4 rounded-full`}
          >
            {categoryNames[categoria]}
          </span>

          <h1 className="font-bold text-5xl py-2">{tituloEntrada}</h1>
          <div className="flex justify-start">
            <div className="flex items-end">
              <img
                src="../../../public/img/logo.png"
                alt="Preview"
                className="mt-2 w-14 h-14"
              />
              <div className="ml-4">
                <p>{nombreCompleto}</p>
                <p>{fPublicacion}</p>
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
      <p className="text-sm">Esta es la descripción : {descripcion}</p>
      <div
        className="contenidoTiny"
        dangerouslySetInnerHTML={{ __html: contenidoTiny }}
      ></div>

      <div className="flex justify-center space-x-4 mb-8">
        <FacebookShareButton
          url="https://yourwebsite.com"
          quote="Check out this amazing content!"
          hashtag="#react"
        >
          <FacebookIcon size={60} iconFillColor="yellow" borderRadius={25} />
        </FacebookShareButton>
        <TwitterShareButton
          url="https://yourwebsite.com"
          title="My awesome article"
        >
          <TwitterIcon size={60} iconFillColor="blue" borderRadius={25} />
        </TwitterShareButton>
        <EmailShareButton
          url="https://yourwebsite.com"
          subject="Don't miss this!"
          body="This is a must-read!"
        >
          <EmailIcon size={60} iconFillColor="red" borderRadius={25} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default PreviewComponent;
