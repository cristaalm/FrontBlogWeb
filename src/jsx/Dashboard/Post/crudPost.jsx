import React, { useContext, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { createUser } from "../../../js/createUser.js";
import { editUser } from "../../../js/editUser.js";
import { Link, useNavigate } from "react-router-dom";

// import "../../../css/App.css";
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
  CirclePlus,
  CloudUpload,
  Search,
} from "lucide-react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
function crudPost() {
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
  const [nombreusuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [correoelectronico, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [perfil, setPerfil] = useState([]);

  const [user, setUser] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");
  const [deleteEntradaId, setDeleteUserId] = useState(null);

  const [deleteModal, setDeleteEntrada] = React.useState(false);
  const [publicModal, setPublicEntrada] = React.useState(false);
  const [revisarModal, setRevisarEntrada] = React.useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  // Agrega un nuevo estado para almacenar el ID del usuario a editar
  const [editUserId, setEditUserId] = useState(null);
  // Agrega un nuevo estado para almacenar los datos del usuario a editar
  const [editUserData, setEditUserData] = useState(null);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const [entradas, setEntradas] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleDelete = (id) => {
    setDeleteEntrada(true);
    setDeleteUserId(id);
  };
  const togglePublic = (id) => {
    setPublicEntrada(true);
    setDeleteUserId(id);
  };
  const toggleRevisar = (id) => {
    setRevisarEntrada(true);
    setDeleteUserId(id);
  };
  function closeModal() {
    setDeleteEntrada(false);
    setPublicEntrada(false);
    setRevisarEntrada(false);
    setDeleteUserId(null);
  }

  // Obtiene los entradas en la tabla (GET)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/entradas"
      );
      const data = await response.json();
      setEntradas(data);
    };
    fetchData();
  }, [reloadTable]); // Vuelve a cargar la tabla cuando reloadTable cambia

  // Define un estado para almacenar el objeto de nombres de categorías
  const [categoryNames, setCategoryNames] = useState({});

  // Dentro del useEffect donde obtienes los datos de categorías, actualiza el estado de categoryNames
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backblogweb.onrender.com/api/categories/${id}`,
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
        const names = {};
        data.forEach((category) => {
          names[category.id] = category.nombre;
        });
        setCategoryNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reloadTable]);

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
  const handleDeleteUser = async (deleteEntradaId) => {
    try {
      const response = await fetch(
        `https://backblogweb.onrender.com/api/entradas/${deleteEntradaId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        setDeleteEntrada(false);
        setMessage("Entrada eliminada exitosamente");
        setMessageClass("success");
      } else {
        setMessage("Error al eliminar, intenta de nuevo");
        setMessageClass("error");
        console.error("Error al eliminar entrada");
      }
    } catch (error) {
      console.error("Error al eliminar entrada:", error);
    }
  };
  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    // Mandar el nombre de usuario del fetch en el request body
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/users/find-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombreusuario }),
        }
      );
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);

  // Publica la entrada (POST)
  const handlePublished = async (id) => {
    try {
      const response = await fetch(
        `https://backblogweb.onrender.com/api/entradas/status/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        setPublicEntrada(false);
        setMessage("Entrada publicada exitosamente");
        setMessageClass("success");
      } else {
        setMessage("Error al publicar, intenta de nuevo");
        setMessageClass("error");
        console.error("Error al publicar entrada");
      }
    } catch (error) {
      console.error("Error al publicar entrada:", error);
    }
  };
  // Revisa la entrada, canmbia el status (POST)
  const handleReview = async (id) => {
    try {
      const response = await fetch(
        `https://backblogweb.onrender.com/api/entradas/review/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        setRevisarEntrada(false);
        setMessage("Entrada publicada exitosamente");
        setMessageClass("success");
      } else {
        setMessage("Error al publicar, intenta de nuevo");
        setMessageClass("error");
        console.error("Error al publicar entrada");
      }
    } catch (error) {
      console.error("Error al publicar entrada:", error);
    }
  };
  const cleanForm = () => {
    setUsuario("");
    setNombre("");
    setCorreo("");
    setContraseña("");
    setPerfil([]);
  };
  // Modifica la función handleSubmit para que pueda enviar una solicitud de actualización en lugar de crear un usuario nuevo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombreusuario &&
      nombre &&
      correoelectronico &&
      contraseña &&
      perfil.length > 0
    ) {
      try {
        if (editUserId !== null) {
          // Si editUserId no es null, significa que se está editando un usuario existente
          await editUser(
            nombreusuario,
            nombre,
            correoelectronico,
            contraseña,
            perfil,
            editUserId // Agregar el ID del usuario a editar
          );
          setMessage("Usuario modificado exitosamente");
        } else {
          // Si editUserId es null, significa que se está creando un nuevo usuario
          await createUser(
            nombreusuario,
            nombre,
            correoelectronico,
            contraseña,
            perfil
          );
          setMessage("Usuario creado exitosamente");
        }
        setEditUserId(null); // Resetear el estado de editUserId a null
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        setMessageClass("success");
        cleanForm(); // Limpia el formulario después de enviar los datos
      } catch (error) {
        setMessage("Error al crear, intenta de nuevo");
        setMessageClass("error");
      }
    } else {
      setMessage("Por favor completa todos los campos");
      setMessageClass("error");
    }
  };

  // Función para cargar los datos del usuario a editar
  const loadEditUserData = (userId) => {
    const userData = entradas.data.find((user) => user.id === userId);
    setEditUserId(userId);
    setEditUserData(userData);
    setUsuario(userData.nombreusuario);
    setNombre(userData.nombre);
    setCorreo(userData.correoelectronico);
    setContraseña(userData.contraseñentradasa);
    setPerfil(userData.perfil);
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
        contentLabel="Eliminar entrada"
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
        <h3 className="text-center text-lg font-semibold">Eliminar entrada</h3>
        <p>¿Estás seguro de que quieres eliminar entrada?</p>
        <div className="flex flex-row justify-between">
          <button className="btn-red flex-1 p-2 m-1" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn-green flex-1 p-2 m-1"
            onClick={() => handleDeleteUser(deleteEntradaId)}
          >
            Eliminar
          </button>
        </div>
      </Modal>
      <Modal
        id="publicar"
        isOpen={publicModal}
        onRequestClose={closeModal}
        contentLabel="Publicar entrada"
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
        <h3 className="text-center text-lg font-semibold">Publicar entrada</h3>
        <p>¿Estás seguro de que quieres publicar entrada?</p>
        <div className="flex flex-row justify-between">
          <button className="btn-red flex-1 p-2 m-1" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn-green flex-1 p-2 m-1"
            onClick={() => handlePublished(deleteEntradaId)}
          >
            Publicar
          </button>
        </div>
      </Modal>
      <Modal
        id="revisar"
        isOpen={revisarModal}
        onRequestClose={closeModal}
        contentLabel="Revisar entrada"
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
        <h3 className="text-center text-lg font-semibold">Revisar entrada</h3>
        <p>¿Estás seguro de que mandar a revisión entrada?</p>
        <div className="flex flex-row justify-between">
          <button className="btn-red flex-1 p-2 m-1" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn-green flex-1 p-2 m-1"
            onClick={() => handleReview(deleteEntradaId)}
          >
            Revisar
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
          {user.rol === "Administrador" && (
            <>
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
        <Tooltip
          id="post"
          style={{
            backgroundColor: "#39b279",
            color: "whitesmoke",
            zIndex: "999",
          }}
        />
        <Tooltip
          id="preview"
          style={{
            backgroundColor: "#2779bd",
            color: "whitesmoke",
            zIndex: "999",
          }}
        />
        <Tooltip
          id="revisar"
          style={{
            backgroundColor: "#805ad5",
            color: "whitesmoke",
            zIndex: "999",
          }}
        />
        <main className="todo_espacio flex-1">
          <div className="contenedor_cuadricular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Entradas</h1>
              </div>
              <div className="w-full">
                <div className="mt-2">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      {/* <h1 className="text-2xl font-bold">Entradas</h1> */}
                    </div>
                    <div className="overflow-x-auto">
                      <div className="relative w-full overflow-auto">
                        <div className="flex justify-end">
                          <Link to="/post/add" className="without_line">
                            <button className="btn-blue p-2 m-1 flex items-center">
                              Añadir nueva entrada
                              <CirclePlus size={20} className="ml-2" />
                            </button>
                          </Link>
                        </div>
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
                                Título
                              </th>
                              <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                Categoría
                              </th>
                              <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                Estatus
                              </th>
                              <th className="border-teal-600 border-r-2 encabezadoTabla"></th>
                            </tr>
                          </thead>
                          {entradas.data &&
                            entradas.data
                              .sort((a, b) => a.id - b.id)
                              .map((entrada) =>
                                (user.rol !== "Administrador" &&
                                  entrada.estatus !== "Publicado") ||
                                (user.rol === "Administrador" &&
                                  entrada.estatus !== "Pendiente") ? (
                                  <tbody key={entrada.id}>
                                    <tr className="tr-body border-2 border-teal-600">
                                      <td className="p-1 w-5">{entrada.id}</td>
                                      <td className="border-2 border-teal-600 p-1">
                                        {entrada.titulo}
                                      </td>
                                      <td className="border-2 border-teal-600 p-1">
                                        {categoryNames[entrada.idcategoria] ||
                                          "Categoría no encontrada"}
                                      </td>
                                      <td className="border-2 border-teal-600 p-1 text-center">
                                        <span
                                          className={`${
                                            entrada.estatus === "Publicado"
                                              ? "text-neutral-100 text-sm bg-green-600 p-1 pl-4 pr-4 rounded-full"
                                              : entrada.estatus === "Pendiente"
                                              ? "bg-yellow-400 text-sm p-1 pl-4 pr-4 rounded-full"
                                              : entrada.estatus === "Revisión"
                                              ? "text-neutral-100 bg-purple-600 text-sm p-1 pl-4 pr-4 rounded-full"
                                              : ""
                                          } inline-block overflow-hidden`}
                                        >
                                          {entrada.estatus}
                                        </span>
                                      </td>
                                      <td className="flex items-center justify-center">
                                        {user.rol !== "Administrador" && (
                                          <Link to={`/post/edit/${entrada.id}`}>
                                            <button
                                              className={`btn-yellow p-2 m-1 ${
                                                entrada.estatus !== "Revisión"
                                                  ? ""
                                                  : "opacity-50 cursor-not-allowed"
                                              }`}
                                              data-tooltip-id="editar"
                                              data-tooltip-place="top"
                                              data-tooltip-content="Editar"
                                              disabled={
                                                entrada.estatus === "Revisión"
                                              }
                                              {...(entrada.estatus !==
                                              "Revisión"
                                                ? {}
                                                : {
                                                    "data-tooltip-hidden": true,
                                                  })}
                                              onClick={() =>
                                                loadEditUserData(entrada.id)
                                              }
                                            >
                                              <Pencil size={20} />
                                            </button>
                                          </Link>
                                        )}
                                        <Link
                                          to={`/post/preview/${entrada.id}`}
                                        >
                                          <button
                                            className={`btn-blue p-2 m-1 ${
                                              entrada.estatus !== "Publicado"
                                                ? ""
                                                : "opacity-50 cursor-not-allowed"
                                            }`}
                                            data-tooltip-id="preview"
                                            data-tooltip-place="top"
                                            data-tooltip-content="Previsualizar"
                                            disabled={
                                              entrada.estatus === "Publicado"
                                            }
                                            {...(entrada.estatus !== "Publicado"
                                              ? {}
                                              : {
                                                  "data-tooltip-hidden": true,
                                                })}
                                          >
                                            <Eye size={20} />
                                          </button>
                                        </Link>
                                        <button
                                          onClick={() =>
                                            toggleDelete(entrada.id)
                                          }
                                          className="btn-red p-2 m-1"
                                          data-tooltip-id="eliminar"
                                          data-tooltip-place="top"
                                          data-tooltip-content="Eliminar"
                                        >
                                          <Trash size={20} />
                                        </button>
                                        {user.rol !== "Administrador" && (
                                          <button
                                            onClick={() =>
                                              toggleRevisar(entrada.id)
                                            }
                                            className={`btn-purple p-2 m-1 ${
                                              entrada.estatus !== "Revisión"
                                                ? ""
                                                : "opacity-50 cursor-not-allowed"
                                            }`}
                                            data-tooltip-id="revisar"
                                            data-tooltip-place="top"
                                            data-tooltip-content="Revisar"
                                            disabled={
                                              entrada.estatus === "Revisión"
                                            }
                                            {...(entrada.estatus !== "Revisión"
                                              ? {}
                                              : {
                                                  "data-tooltip-hidden": true,
                                                })}
                                          >
                                            <Search size={20} />
                                          </button>
                                        )}
                                        {user.rol === "Administrador" && (
                                          <button
                                            onClick={() =>
                                              togglePublic(entrada.id)
                                            }
                                            className={`btn-green p-2 m-1 ${
                                              entrada.estatus !== "Publicado"
                                                ? ""
                                                : "opacity-50 cursor-not-allowed"
                                            }`}
                                            data-tooltip-id="post"
                                            data-tooltip-place="top"
                                            data-tooltip-content="Publicar"
                                            disabled={
                                              entrada.estatus === "Publicado"
                                            }
                                            {...(entrada.estatus !== "Publicado"
                                              ? {}
                                              : {
                                                  "data-tooltip-hidden": true,
                                                })}
                                          >
                                            <CloudUpload size={20} />
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                ) : null
                              )}
                        </table>
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

export default crudPost;
