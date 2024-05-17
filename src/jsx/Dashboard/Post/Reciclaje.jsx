import React, { useContext, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { createUser } from "../../../js/createUser.js";
import { editUser } from "../../../js/editUser.js";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../constants/global.js";
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
  Trash,
  RotateCcw,
  CloudUpload,
} from "lucide-react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function crudPost() {
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      overlayColor: "lemon",
      theme: "dark",
      nextBtnText: "—›",
      prevBtnText: "‹—",
      doneBtnText: "✕",
      onPopoverRender: (popover, { config, state }) => {
        const firstButton = document.createElement("button");
        //firstButton.innerText = "Go to First";
        //popover.footerButtons.appendChild(firstButton);

        firstButton.addEventListener("click", () => {
          // Al hacer clic en el botón, finaliza el tour y marca como completado
          driverObj.destroy();
          sessionStorage.setItem("tourCompleted", true);
        });
      },
      steps: [
        {
          element: ".entradas-tour",
          popover: {
            title: "Papelera de Reciclaje",
            description:
              "Esta sección es donde puedes ver las entradas que fueron eliminadas.",
          },
        },
        {
          element: ".Titulo-tour",
          popover: {
            title: "Título",
            description:
              "Aquí verás los títulos de las entradas que has eliminado.",
          },
        },
        {
          element: ".Categoria-tour",
          popover: {
            title: "Categoría",
            description:
              "Esta columna muestra la categoría que fue eliminada.",
          },
        },
        {
          element: ".estatus-tour",
          popover: {
            title: "Estatus",
            description: "Aquí encontrarás el estado actual de cada entrada.",
          },
        },
        {
          element: ".motivo-tour",
          popover: {
            title: "Motivo de rechazo.",
            description:
              "Aquí esta la justificación de porque se quiere eliminar.",
          },
        },
        {
          element: ".previsualizar-tour",
          popover: {
            title: "Previsualizar",
            description:
              "Al presionar este botón, podrás ver la entrada que fue eliminada.",
          },
        },
        {
          element: ".antiguo-tour",
          popover: {
            title: "Entradas más recientes y más antiguas",
            description:
              "Utilice este botón desplegable para seleccionar y visualizar la entrada eliminada más reciente o la más antigua en la sección correspondiente.",
          },
        },
        {
          element: ".btn-iniciar-tour",
          popover: {
            title: "Reiniciar Tour",
            description:
              "Si quieres comenzar el tour nuevamente, simplemente haz clic en este botón.",
          },
        },
      ],
    });
    driverObj.drive();
  };
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

  const [orden, setOrden] = useState("descendente");

  const handleChangeOrden = (e) => {
    setOrden(e.target.value);
  };

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
  const toggleViewPost = (id) => {
    navigate(`/blog-post/${id}`);
  };
  const togglePreview = (id) => {
    navigate(`/post/preview-delete/${id}`);
  };
  const toggleEditPost = (id) => {
    navigate(`/post/edit/${id}`);
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
      const response = await fetch(BaseUrl + `/api/entradas/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEntradas(data);
      paginate("#tableEntradas", 10);
    };
    fetchData();
  }, [reloadTable]); // Vuelve a cargar la tabla cuando reloadTable cambia

  // Define un estado para almacenar el objeto de nombres de categorías
  const [categoryNames, setCategoryNames] = useState({});

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
        BaseUrl + `/api/entradas/${deleteEntradaId}`,
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
  // Publica la entrada (POST)
  const handlePublished = async (id) => {
    try {
      const response = await fetch(BaseUrl + `/api/entradas/status/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      const response = await fetch(BaseUrl + `/api/entradas/pendiente/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
        <p>¿Estás seguro de eliminar entrada?</p>
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
        ariaHideApp={false}
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
        <h3 className="text-center text-lg font-semibold">Retornar entrada</h3>
        <p>¿Estás seguro retornar entrada y cambiar de estatus?</p>
        <div className="flex flex-row justify-between">
          <button className="btn-red flex-1 p-2 m-1" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn-green flex-1 p-2 m-1"
            onClick={() => handleReview(deleteEntradaId)}
          >
            Retornar
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
          id="manual"
          style={{
            backgroundColor: "#b8ddd6",
            color: "#035165",
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
          id="viewWeb"
          style={{
            backgroundColor: "#000",
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
                <h1 className="tamaño_fuente entradas-tour">
                  Papelera de Reciclaje
                </h1>
                {user.rol != "Administrador" && (
                  <button
                    onClick={startTour}
                    data-tooltip-content="Iniciar tour"
                    data-tooltip-id="manual"
                    className="rounded mb-2 h-10 w-10 btn-iniciar-tour"
                    alt="Iniciar Tour"
                  >
                    <img
                      src="/img/logoRedB.png"
                      className="rounded h-full w-full"
                      alt="Logo RedB"
                    />
                  </button>
                )}
              </div>
              <div className="w-full">
                <div className="mt-2">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      {/* <h1 className="text-2xl font-bold">Entradas</h1> */}
                    </div>
                    <div className="overflow-x-auto">
                      <div className="relative w-full overflow-auto">
                        <div className="flex justify-end gap-2">
                          <select
                            className="m-1 ring-teal-600 bg-neutral-100 ring-2 rounded-md border-transparent-100 text-cyan-950 mr-6 p-2 w-z focus:border-cyan-900 antiguo-tour"
                            id="orden"
                            name="orden"
                            value={orden}
                            onChange={handleChangeOrden}
                          >
                            <option value="ascendente">Más antiguos</option>
                            <option value="descendente">Más recientes</option>
                          </select>
                        </div>
                        <div className="mb-2">
                          {message && (
                            <div className={`message ${messageClass}`}>
                              {message}
                            </div>
                          )}
                        </div>

                        <table
                          id="tableEntradas"
                          className="w-full border-collapse border-teal-600 caption-bottom text-sm"
                        >
                          <thead className="">
                            <tr className="header encabezadoTabla border-2 border-teal-600 text-neutral-100 text-normal">
                              <th className="border-neutral-100 border-r-2 encabezadoTabla Titulo-tour">
                                Título
                              </th>
                              <th className="border-neutral-100 border-r-2 encabezadoTabla Categoria-tour">
                                Categoría
                              </th>
                              {user.rol === "Administrador" && (
                                <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                  Creador
                                </th>
                              )}
                              <th className="border-neutral-100 border-r-2 encabezadoTabla estatus-tour">
                                Estatus
                              </th>
                              <th className="border-neutral-100 border-r-2 encabezadoTabla motivo-tour">
                                Motivo de Rechazo
                              </th>
                              <th className="border-teal-600 border-r-2 encabezadoTabla"></th>
                            </tr>
                          </thead>
                          {entradas.data &&
                            entradas.data
                              .filter((entrada) => {
                                if (user.rol !== "Administrador") {
                                  return nombreusuario === entrada.usuario;
                                }
                                return true; // Mostrar todas las entradas si el usuario es administrador
                              })
                              .sort((a, b) =>
                                orden === "ascendente"
                                  ? a.id - b.id
                                  : b.id - a.id
                              )
                              .map((entrada) => (
                                <tbody key={entrada.id}>
                                  <Modal
                                    ariaHideApp={false}
                                    id="publicar"
                                    isOpen={publicModal}
                                    onRequestClose={closeModal}
                                    contentLabel="Publicar entrada"
                                    style={customStyles}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
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
                                      Motivo de eliminación
                                    </h3>
                                    <div className="bg-teal-100 p-4 m-2 rounded-lg">
                                      {entrada.motivorechazo}
                                    </div>
                                  </Modal>
                                  <tr className="tr-body border-2 border-teal-600">
                                    {/* <td className="p-1 w-5">{entrada.id}</td> */}
                                    <td className="border-2 border-teal-600 p-1">
                                      {entrada.titulo}
                                    </td>
                                    <td className="border-2 border-teal-600 p-1">
                                      {entrada.categoria}
                                    </td>
                                    {user.rol === "Administrador" && (
                                      <td className="border-2 border-teal-600 p-1">
                                        {entrada.nombre}
                                      </td>
                                    )}
                                    <td className="border-2 border-teal-600 p-1 text-center">
                                      <span
                                        className={`${
                                          entrada.estatus === "Publicado"
                                            ? "text-neutral-100 text-sm bg-green-600 p-1 pl-4 pr-4 rounded-full"
                                            : entrada.estatus === "Pendiente"
                                            ? "bg-yellow-400 text-sm p-1 pl-4 pr-4 rounded-full"
                                            : entrada.estatus === "Revisión"
                                            ? "text-neutral-100 bg-purple-600 text-sm p-1 pl-4 pr-4 rounded-full"
                                            : "text-neutral-100 bg-red-600 text-sm p-1 pl-4 pr-4 rounded-full"
                                        } inline-block overflow-hidden`}
                                      >
                                        {entrada.estatus}
                                      </span>
                                    </td>
                                    <td className="border-2 border-teal-600 p-1">
                                      {entrada.motivorechazo}
                                    </td>
                                    <td className="flex items-center justify-center">
                                      <button
                                        onClick={() =>
                                          togglePreview(entrada.id)
                                        }
                                        className={`btn-blue p-2 m-1 previsualizar-tour ${
                                          entrada.estatus !== "Publicado"
                                            ? ""
                                            : "opacity-25 cursor-not-allowed"
                                        }`}
                                        data-tooltip-id="preview"
                                        data-tooltip-place="top"
                                        data-tooltip-content="Previsualizar"
                                        disabled={
                                          entrada.estatus === "Publicado"
                                        }
                                        {...(entrada.estatus !== "Publicado"
                                          ? {}
                                          : { "data-tooltip-hidden": true })}
                                      >
                                        <Eye size={20} />
                                      </button>
                                      {user.rol === "Administrador" && (
                                        <>
                                          <button
                                            onClick={() =>
                                              toggleRevisar(entrada.id)
                                            }
                                            className={`btn-green p-2 m-1 ${
                                              entrada.estatus !== "Publicado"
                                                ? ""
                                                : "opacity-25 cursor-not-allowed"
                                            }`}
                                            data-tooltip-id="post"
                                            data-tooltip-place="top"
                                            data-tooltip-content="Retornar"
                                            disabled={
                                              entrada.estatus === "Publicado"
                                            }
                                            {...(entrada.estatus === "Publicado"
                                              ? { "data-tooltip-hidden": true }
                                              : {})}
                                          >
                                            <RotateCcw size={20} />
                                          </button>
                                          <button
                                            onClick={() =>
                                              toggleDelete(entrada.id)
                                            }
                                            className="btn-red p-2 m-1 eliminar-tour"
                                            data-tooltip-id="eliminar"
                                            data-tooltip-place="top"
                                            data-tooltip-content="Eliminar"
                                          >
                                            <Trash size={20} />
                                          </button>
                                        </>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
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
