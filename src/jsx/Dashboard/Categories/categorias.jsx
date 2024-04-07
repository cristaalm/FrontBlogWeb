import React, { useContext, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { FormattedMessage, useIntl } from "react-intl"; // Importa FormattedMessage y useIntl
import { createCategory } from "../../../js/createCategory.js";
import { editCategory } from "../../../js/editCategory.js";
import { GithubPicker } from "react-color";

import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../../Elements/SideBar.jsx";
import {
  LayoutDashboard,
  Users,
  Book,
  PlusSquare,
  Layers,
  Pencil,
  Trash,
} from "lucide-react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
function categorías() {
  const customStyles = {
    content: {
      // zIndex: "99999",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px", // Set the maximum width of the modal
      padding: "20px", // Add padding to the modal content
      borderRadius: "8px", // Add border radius to the modal
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Add a subtle shadow
    },
    overlay: {
      zIndex: "9999",
      backgroundColor: "rgba(3, 81, 101, 0.5)", // Add a semi-transparent overlay
    },
  };
  const navigate = useNavigate(); // Obtiene la función de navegación

  // Datos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deleteCategoryId, setCategoryId] = useState(null);

  const [deleteModal, setDeleteContact] = React.useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  // Agrega un nuevo estado para almacenar el ID del usuario a editar
  const [editCategoryId, setEditCategoryId] = useState(null);
  // Agrega un nuevo estado para almacenar los datos del usuario a editar
  const [editCategoryData, setEditCategoryData] = useState(null);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const [categories, setCategories] = useState([]);
  const handleAddImage = () => {
    // Lógica para insertar la imagen en el editor de texto
    console.log("Link de la imagen:", imageLink);
    console.log("Ancho de la imagen:", imageWidth);
    console.log("Alto de la imagen:", imageHeight);
    // Aquí puedes realizar la lógica para insertar la imagen en el editor de texto si es necesario
    setShowModal(false); // Cierra el modal después de procesar la imagen
  };
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleEntriesDropdown = () => {
    setIsEntriesDropdownOpen(!isEntriesDropdownOpen);
  };
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleDelete = (id) => {
    setDeleteContact(true);
    setCategoryId(id);
  };
  function closeModal() {
    setDeleteContact(false);
    setCategoryId(null);
  }

  // Obtiene los categorías en la tabla (GET)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, [reloadTable]); // Vuelve a cargar la tabla cuando reloadTable cambia

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Elimina el usuario (POST)
  const handleDeleteCategory = async (deleteCategoryId) => {
    try {
      const response = await fetch(
        `https://backblogweb.onrender.com/api/categories/${deleteCategoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        setDeleteContact(false);
        setMessage("Categoría eliminada exitosamente");
        setMessageClass("success");
      } else {
        setMessage("Error al eliminar, intenta de nuevo");
        setMessageClass("error");
        console.error("Error al eliminar categoría");
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };
  const cleanForm = () => {
    setNombre("");
    setDescripcion("");
    setSelectedColor("");
  };
  // Modifica la función handleSubmit para que pueda enviar una solicitud de actualización en lugar de crear un usuario nuevo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre && descripcion) {
      try {
        if (editCategoryId !== null) {
          // Si editCategoryId no es null, significa que se está editando una categoría existente
          await editCategory(
            nombre,
            descripcion,
            // selectedColor,
            editCategoryId // Agregar el ID de la categoría a editar
          );
          setMessage("Categoría modificada exitosamente");
        } else {
          // Si editCategoryId es null, significa que se está creando una nueva categoría
          await createCategory(nombre, descripcion, selectedColor);
          setMessage("Categoría creada exitosamente");
        }
        setEditCategoryId(null); // Resetear el estado de editCategoryId a null
        setReloadTable(!reloadTable); // Cambiar el estado para recargar la tabla
        setMessageClass("success");
        cleanForm(); // Limpiar el formulario después de enviar los datos
      } catch (error) {
        setMessage("Error al crear, intenta de nuevo");
        setMessageClass("error");
      }
    } else {
      setMessage("Por favor completa todos los campos");
      setMessageClass("error");
    }
  };

  const loadEditCategoryData = (categoryId) => {
    const categoryData = categories.data.find(
      (category) => category.id === categoryId
    );
    setEditCategoryId(categoryId);
    setEditCategoryData(categoryData);
    setNombre(categoryData.nombre);
    setDescripcion(categoryData.descripcion);
  };

  return (
    <div
      style={{ display: "flex", backgroundColor: "whitesmoke" }}
      className="flex h-screen"
    >
      <Modal
        id="root"
        isOpen={deleteModal}
        onRequestClose={closeModal}
        contentLabel="Eliminar categoría"
        style={customStyles}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ion-icon
            name="close"
            onClick={closeModal}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: "#650303",
            }}
          ></ion-icon>
        </div>
        <h3 className="text-center text-lg font-semibold">
          Eliminar categoría
        </h3>
        <p>¿Estás seguro de que quieres eliminar la categoría?</p>
        <div className="flex flex-row justify-between">
          <button className="btn-red flex-1 p-2 m-1" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn-green flex-1 p-2 m-1"
            onClick={() => handleDeleteCategory(deleteCategoryId)}
          >
            Eliminar
          </button>
        </div>
      </Modal>

      <div
        style={{
          // width:"13%",
          position: "static",
          height: "100%",
          backgroundColor: "#fffdee",
        }}
      >
        <Sidebar>
          <Link to="/dashboard" className="without_line">
            <SidebarItem icon={<LayoutDashboard />} text="Dashboard" />
          </Link>
          <SidebarItemWithSubItems
            icon={<Book className="text-white" />}
            text="Entradas"
            subItems={[
              { icon: <Layers />, text: "Todas", to: "/post/all" },
              {
                icon: <PlusSquare />,
                text: "Añadir Nueva",
                to: "/post/add",
              },
              // { icon: <Layers />, text: "Categorías" }
            ]}
          />
          <Link to="/categories" className="without_line">
            <SidebarItem icon={<Layers />} text="Categorías" />
          </Link>
          <Link to="/users" className="without_line">
            <SidebarItem icon={<Users />} text="Usuario" />
          </Link>
        </Sidebar>
      </div>
      <div className="inicio">
        <Tooltip
          id="editar"
          style={{
            backgroundColor: "#d69e2e",
            color: "whitesmoke",
            zIndex: "999",
          }}
        />
        <Tooltip
          id="eliminar"
          style={{
            backgroundColor: "#e53e3e",
            color: "whitesmoke",
            zIndex: "999",
          }}
        />
        <main className="todo_espacio flex-1">
          <div className="contenedor_cuadricular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Categorías</h1>
              </div>
              <div className="flex sm:flex-row w-40% flex-col">
                <form onSubmit={handleSubmit} className="mt-4 sm:w-full mr-4">
                  <div className="">
                    <div className="font-medium" htmlFor="title">
                      Nombre de categoría
                    </div>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="m-0 w-full p-2 in2"
                      placeholder="Ingrese categoría"
                    ></input>
                    <div className="flex items-center mt-2">
                      <div className="font-medium mr-2">Color:</div>
                      <div
                        className="rounded-full w-6 h-6"
                        style={{ backgroundColor: selectedColor }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Descripción
                    </div>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full bg-neutral-100 p-2 in2 mt-2 ring-2 ring-teal-600 rounded"
                      placeholder="Ingrese correo electrónico"
                    ></textarea>
                    <p className="text-neutral-400 text-sm">
                      Esta descripción será mostrada al usuario visitante.
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Color
                    </div>
                    <GithubPicker
                      colors={[
                        "#B80000",
                        "#DB3E00",
                        "#FCCB00",
                        "#008B02",
                        "#006B76",
                        "#1273DE",
                        "#004DCF",
                        "#5300EB",
                        "#EB9694",
                        "#FAD0C3",
                        "#FEF3BD",
                        "#C1E1C5",
                        "#BEDADC",
                        "#C4DEF6",
                        "#BED3F3",
                        "#D4C4FB",
                      ]}
                      onChange={(color) => setSelectedColor(color.hex)}
                      className="ml-2"
                    />
                  </div>
                  <div></div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Imagen Destacada
                    </div>
                    <button
                      className="w-full btn-yellow p-4 m-1"
                      onClick={() => loadEditCategoryData(category.id)}
                    >
                      Añadir imagen
                      <Pencil size={20} />
                    </button>
                  </div>
                  <div>
                    <button type="submit" className="entr tracking-widest mt-4">
                      {editCategoryId !== null
                        ? "Actualizar categoría"
                        : "Añadir categoría"}
                    </button>
                  </div>
                </form>
                <div className="sm:w-full w-60%">
                  <div className="mt-2">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        {/* <h1 className="text-2xl font-bold">Entradas</h1> */}
                      </div>
                      <div className="overflow-x-auto">
                        <div className="relative w-full overflow-auto">
                          <div className="mb-2">
                            {message && (
                              <div className={`message ${messageClass}`}>
                                {message}
                              </div>
                            )}
                          </div>
                          <table className="w-full border-collapse border-teal-600 caption-bottom text-sm">
                            <thead className="">
                              <tr className="header encabezadoTabla border-2 border-teal-600 text-neutral-100 text-normal">
                                <th className="border-neutral-100 border-r-2 encabezadoTabla w-5">
                                  ID
                                </th>
                                <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                  Nombre
                                </th>
                                <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                  Color
                                </th>
                                <th className="border-teal-600 border-r-2 encabezadoTabla"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {categories.data &&
                                categories.data.map((category) => (
                                  <tr
                                    key={category.id}
                                    className="tr-body border-2 border-teal-600"
                                  >
                                    <td className="p-1 w-5">{category.id}</td>
                                    <td className="border-2 border-teal-600 p-1">
                                      {category.nombre}
                                    </td>
                                    <td className="border-2 border-teal-600 p-1">
                                      <div
                                        style={{
                                          backgroundColor: category.color,
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      ></div>
                                    </td>
                                    <td className="flex items-center justify-center">
                                      <button
                                        className="btn-yellow p-2 m-1"
                                        data-tooltip-id="editar"
                                        data-tooltip-place="top"
                                        data-tooltip-content="Editar"
                                        onClick={() =>
                                          loadEditCategoryData(category.id)
                                        }
                                      >
                                        <Pencil size={20} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          toggleDelete(category.id)
                                        }
                                        className="btn-red p-2 m-1"
                                        data-tooltip-id="eliminar"
                                        data-tooltip-place="top-end"
                                        data-tooltip-content="Eliminar"
                                      >
                                        <Trash size={20} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default categorías;
