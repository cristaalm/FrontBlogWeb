import React, { useRef, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { createCategory } from "../../../js/createCategory.js";
import { editCategory } from "../../../js/editCategory.js";
import SketchColor from "./SketchColor.jsx";
import { BaseUrl } from "../../../constants/global.js";
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
  Trash,
  Pencil,
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
  const [user, setUser] = useState([]);

  // Datos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // Inicializa el estado de selectedColor con un color inicial
  const [selectedColor, setSelectedColor] = useState("");

  const [isValidTitle, setIsValidTitle] = useState(false);

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

  const fileInputRef = useRef(null);

  const [isValidDescription, setIsValidDescription] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isValidImage, setIsValidImage] = useState(null);

  const handleImageUpload = (file) => {
    if (!file) {
      setIsValidImage(false);
      setUploadError("Por favor, seleccione una imagen para cargar.");
      setLoading(false);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setIsValidImage(false);
      setUploadError("El archivo seleccionado no es una imagen válida.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setUploadError("");
    setIsValidImage(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreviewImage(base64String);
      setIsValidImage(true);
      setLoading(false);
    };
    reader.onerror = () => {
      setUploadError("Error al cargar la imagen.");
      setIsValidImage(false);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Función para actualizar el color seleccionado
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    setIsValidTitle(value.trim() !== ""); // Validación si el campo no está vacío
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    console.log("Nuevo valor de descripción:", value); // Depuración
    setDescripcion(value);
    setIsValidDescription(value.trim() !== "");
  };
  useEffect(() => {
    // Validación del nombre
    setIsValidTitle(nombre.trim() !== "");
  }, [nombre]); // Dependencia del efecto al estado 'nombre'

  useEffect(() => {
    // Validación de la descripción
    setIsValidDescription(descripcion.trim() !== "");
  }, [descripcion]); // Dependencia del efecto al estado 'descripcion'

  useEffect(() => {
    // Si usas alguna validación basada en la imagen, asegúrate de que también se resetee correctamente
    setIsValidImage(previewImage ? true : false);
  }, [previewImage]); // Dependencia del efecto al estado 'previewImage'

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

  // Obtiene los categorías en la tabla (GET) y los ordena por ID ascendente
  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      navigate("/login");
    }
    if (storedAuth == "false") {
      navigate("/login");
    }
    const fetchData = async () => {
      const response = await fetch(BaseUrl + "/api/categories");
      const data = await response.json();
      paginate("#tableCategorias", 10);
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

  // Elimina el usuario (DELETE)
  const handleDeleteCategory = async (deleteCategoryId) => {
    try {
      const response = await fetch(
        BaseUrl + `/api/categories/${deleteCategoryId}`,
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
    setPreviewImage(null);

    // Restablece también los estados de validación
    setIsValidTitle(null);
    setIsValidDescription(null);
    setIsValidImage(null);
  };

  // Modifica la función handleSubmit para que pueda enviar una solicitud de actualización en lugar de crear un usuario nuevo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre && descripcion) {
      if (selectedColor) {
        try {
          if (editCategoryId !== null) {
            // Si editCategoryId no es null, significa que se está editando una categoría existente
            await editCategory(
              nombre,
              descripcion,
              selectedColor,
              previewImage,
              editCategoryId // Agregar el ID de la categoría a editar
            );
            setMessage("Categoría modificada exitosamente");
          } else {
            // Si editCategoryId es null, significa que se está creando una nueva categoría
            await createCategory(
              nombre,
              descripcion,
              selectedColor,
              previewImage
            );
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
        setMessage("Por favor selecciona un color");
        setMessageClass("error");
      }
    } else {
      setMessage("Por favor completa todos los campos");
      setMessageClass("error");
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 2000); // Ajusta el tiempo según sea necesario

      return () => clearTimeout(timer);
    }
  }, [message]);
  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    // Mandar el nombre de usuario del fetch en el request body
    const fetchData = async () => {
      const response = await fetch(BaseUrl + "/api/users/find-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreusuario }),
      });
      const data = await response.json();
      setUser(data);
      setUsuario(nombreusuario);
    };
    fetchData();
  }, []);
  const loadEditCategoryData = (categoryId) => {
    const categoryData = categories.data.find(
      (category) => category.id === categoryId
    );
    setEditCategoryId(categoryId);
    setEditCategoryData(categoryData);
    setNombre(categoryData.nombre);
    setDescripcion(categoryData.descripcion);
    setSelectedColor(categoryData.color);
    $("#btnSketch").trigger("click", [categoryData.color]);
    //dispatch an event on button click. Send optional data along with the event. Child component will receive the data and process it.

    // Actualiza el estado previewImage con la URL de la imagen
    setPreviewImage(categoryData.imgdestacada);
  };

  return (
    <div
      style={{ display: "flex", backgroundColor: "whitesmoke" }}
      className="flex h-screen"
    >
      <Modal
        ariaHideApp={false}
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
          {user.rol !== "Administrador" && (
            <>
              <Link to="/post/all" className="without_line">
                <SidebarItem icon={<Book />} text="Entradas" />
              </Link>
              <Link to="/post/reciclaje" className="without_line">
                <SidebarItem icon={<Trash />} text="Papelera de Reciclaje" />
              </Link>
            </>
          )}

          {user.rol === "Administrador" && (
            <>
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
                  {
                    icon: <Trash />,
                    text: "Papelera de Reciclaje",
                    to: "/post/reciclaje",
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
            </>
          )}
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
                <h1 className="tamaño_fuente cat1">Categorías</h1>
              </div>

              <div className="flex sm:flex-row w-40% flex-col">
                <form onSubmit={handleSubmit} className="mt-4 sm:w-full mr-4">
                  <div className="">
                    <div className="font-medium" htmlFor="title">
                      Nombre de categoría
                    </div>
                    <div className="flex items-center">
                      <input
                        value={nombre}
                        onChange={handleNombreChange}
                        className={`m-0 w-full p-2 in2 ${
                          isValidTitle === false
                            ? "input-error"
                            : isValidTitle === true
                            ? "input-success"
                            : ""
                        }`}
                        placeholder="Ingrese categoría"
                      ></input>
                      <SketchColor
                        color={selectedColor}
                        onChange={handleColorChange}
                      />
                      {/* <Github
                    className="colorp"
                    style={{
                      marginLeft: "10px",
                      width: "150px",
                      transform: "rotate(-90deg) scaleX(1)", // Rota la flecha 90 grados en sentido antihorario y la invierte horizontalmente
                    }}
                    color={selectedColor}
                    onChange={handleColorChange}
                  /> */}
                    </div>
                    {isValidTitle === false && (
                      <div className="validation-message">Campo incompleto</div>
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="font-medium" htmlFor="description">
                      {" "}
                      {/* Asegúrate de usar htmlFor con el ID correcto si es necesario */}
                      Descripción
                    </div>
                    <textarea
                      value={descripcion}
                      onChange={handleDescriptionChange}
                      className={`w-full bg-neutral-100 p-2 in2 mt-2 ring-2 h-40 ring-teal-600 rounded ${
                        isValidDescription === false
                          ? "input-error1"
                          : isValidDescription === true
                          ? "input-success1"
                          : ""
                      }`}
                      placeholder="Ingrese descripción"
                    ></textarea>
                    {isValidDescription === false && (
                      <div className="validation-message">
                        La descripción no puede estar vacía
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Imagen Destacada
                    </div>
                    {loading && (
                      <div className="validation-message">
                        Cargando imagen...
                      </div>
                    )}
                    {uploadError && (
                      <div className="validation-message text-red-500">
                        {uploadError}
                      </div>
                    )}
                    {isValidImage === false && (
                      <div className="validation-message text-red-500">
                        La imagen no puede estar vacía y debe ser válida
                      </div>
                    )}
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-2 max-w-full h-48 mx-auto cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                      />
                    ) : (
                      <img
                        src="/img/upload1.png"
                        alt="Default Preview"
                        onClick={() => fileInputRef.current.click()}
                        className="mt-2 max-w-full h-48 mx-auto cursor-pointer"
                      />
                    )}
                    <button
                      type="button"
                      className="pre tracking-widest p-3 mt-4"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <div className="">Subir imagen</div>
                    </button>

                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      ref={fileInputRef}
                      // style={{ display: "none" }}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="entr tracking-widest p-3 mt-4"
                    >
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
                          <table
                            id="tableCategorias"
                            className="w-full border-collapse border-teal-600 caption-bottom text-sm"
                          >
                            <thead className="">
                              <tr className="header encabezadoTabla border-2 border-teal-600 text-neutral-100 text-normal">
                                {/* <th className="border-neutral-100 border-r-2 encabezadoTabla w-5">
                                  ID
                                </th> */}
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
                                categories.data
                                  .sort((a, b) => a.id - b.id) // Ordena las categorías por ID ascendente
                                  .map((category) => (
                                    <tr
                                      key={category.id}
                                      className="tr-body border-2 border-teal-600"
                                    >
                                      {/* <td className="p-1 w-5">{category.id}</td> */}
                                      <td className="border-2 border-teal-600 p-1">
                                        {category.nombre}
                                      </td>
                                      <td className="border-2 border-teal-600 p-1">
                                        <div
                                          style={{
                                            backgroundColor: category.color,
                                            width: "auto",
                                            height: "35px",
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
                                          onClick={() => {
                                            if (
                                              category.entradas == 0
                                            ) {
                                              toggleDelete(category.id)
                                            }
                                          }}
                                          // onClick={() =>
                                          //   toggleDelete(category.id)
                                          // }
                                          className={`btn-red p-2 m-1 ${
                                            category.entradas > 0
                                              ? "opacity-25 cursor-not-allowed"
                                              : ""
                                          }`}
                                          data-tooltip-id="eliminar"
                                          data-tooltip-place="top-end"
                                          data-tooltip-content="Eliminar"
                                          disabled={
                                            category.entradas > 0
                                          }
                                          {...(category.entradas > 0
                                            ? { "data-tooltip-hidden": true }
                                            : {})}
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
