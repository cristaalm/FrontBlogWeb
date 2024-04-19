import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../../constants/global";
const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [categoryName, setCategoryName] = useState(""); // Nuevo estado para el nombre de la categoría
  const [categoryDescription, setCategoryDescription] = useState(""); // Nuevo estado para la descripción de la categoría

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(BaseUrl + "/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
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

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    console.log("Añadir categoría", categoryName, categoryDescription);
    // Implementa aquí la lógica para enviar los datos al backend
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setImageLink("");
    setImageWidth("");
    setImageHeight("");
  };

  return (
    <main className="todo_espacio">
      <div className="contenedor_cuadicular">
        <div className="margin">
          <div className="entrada">
            <h1 className="tamaño_fuente">Categorías</h1>
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
              Nombre De La Categoria
            </div>
            <textarea
              className="cuadro_txt"
              placeholder="Ingresa Tituo"
            ></textarea>
          </div>
          <div className="margen_boton">
            <div className="ancho" htmlFor="description">
              Descripción
            </div>
            <textarea
              className="cuadro_txt"
              placeholder="Ingresa Descripcion"
            ></textarea>
          </div>
          <div className="margen_boton">
            <button type="button" className="dest" onClick={handleToggleModal}>
              Imagen Destacada
            </button>
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
          </div>
          <div>
            <button type="submit" className="entr">
              Añadir Categoria
            </button>
          </div>
        </div>
        <div className="right">
          <div className="bg-white p-6">
            <div className="flex flex-col space-y-4">
              <div className="overflow-x-auto">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="header">
                      <tr className="tr-header">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Color</th>
                        <th>-----</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tr-body">
                        <td>1</td>
                        <td>lorem ipssum</td>
                        <td>red</td>
                        <td>
                          <button className="btn-green mr-2">Editar</button>
                          <button className="btn-red mr-2">Eliminar</button>
                        </td>
                      </tr>
                      <tr className="tr-body">
                        <td>2</td>
                        <td>lorem ipssum</td>
                        <td>width</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Categorias;
