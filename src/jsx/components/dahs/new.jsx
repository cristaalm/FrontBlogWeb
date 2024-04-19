import React, { useEffect, useState } from "react";
import "../../../css/visualdeimagen.css";
import { BaseUrl } from "../../../constants/global";
const NuevaEntrada = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(BaseUrl + "/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddImage = () => {
    console.log("Link de la imagen:", imageLink);
    console.log("Ancho de la imagen:", imageWidth);
    console.log("Alto de la imagen:", imageHeight);
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setImageLink("");
    setImageWidth("");
    setImageHeight("");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.tiny.cloud/1/kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2/tinymce/6/tinymce.min.js";
    script.referrerpolicy = "origin";
    document.head.appendChild(script);

    script.onload = () => {
      window.tinymce.init({
        selector: "#entryDescription",
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | bold italic underline strikethrough | link image media table | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
      });
    };

    return () => {
      // Destruye el editor para evitar fugas de memoria
      window.tinymce?.remove("#entryDescription");
    };
  }, []);
  return (
    <main className="todo_espacio">
      <div className="contenedor_cuadicular">
        <div className="margin">
          <div className="entrada">
            <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
            {/* <div className="entradaChil">
                    <img
                    src="/public/img/logo without bg.png"
                    width="50px;"
                    alt="Imagen del Usuario"
                    />
                    <span className="hello">¡Hola, Admin!</span>
                 </div> */}
          </div>
        </div>
      </div>
      <div className="todo_espacio2">
        <div className="left">
          <div className="margen_boton">
            <div className="ancho" htmlFor="title">
              Título de Entrada
            </div>
            <textarea className="cuadro_txt"></textarea>
          </div>
          <div className="margen_boton">
            <div className="ancho" htmlFor="category">
              Categorías
            </div>
            <select className="diseño">
              <option>Seleccione su categoría...</option>
              {categories.data &&
                categories.data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className="margen_boton">
            <div className="ancho" htmlFor="description">
              Descripción
            </div>
            <textarea className="cuadro_txt"></textarea>
          </div>
          <div className="margen_boton">
            <button
              type="button"
              className="pre"
              onClick={() => window.open("/preview-post", "_blank")}
            >
              Previsualizar
            </button>
            <div className="liquid"></div>
          </div>
          <div className="margen_boton">
            <button type="button" className="pre" onClick={handleToggleModal}>
              Imagen Destacada
            </button>
          </div>
          {showModal && (
            <div className="modalOverlay">
              <div className="modalContent">
                <h2>Añadir Imagen Destacada</h2>
                <input
                  type="text"
                  placeholder="Enlace de la imagen"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Ancho"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Alto"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(e.target.value)}
                />
                <button onClick={handleAddImage}>Añadir</button>
                <button onClick={handleCloseModal}>Cancelar</button>
              </div>
            </div>
          )}
          <div>
            <button type="submit" className="entr">
              Guardar Entrada
            </button>
          </div>
        </div>
        <div className="right">
          <div className="previsualizar">
            <div className="bottonpre">
              <h2 className="negt">Previsualización</h2>
            </div>
            <div className="border">
              <div className="form-group tinymce-container">
                <div className="enter"></div>
                <textarea id="entryDescription"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NuevaEntrada;
