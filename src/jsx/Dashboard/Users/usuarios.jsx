import React, { useContext, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip"; // 1. Debemos de importar Tooltip
import Modal from "react-modal"; // 1. Importamos el MODAL
import { FormattedMessage, useIntl } from "react-intl"; // Importa FormattedMessage y useIntl
import { createUser } from "../../../js/createUser";
import { editUser } from "../../../js/editUser";
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
  Pencil,
  Trash,
} from "lucide-react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
function usuarios() {
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

  const [showPassword, setShowPassword] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [deleteModal, setDeleteContact] = React.useState(false);
  const [pruebaModal, setPruebaModal] = React.useState(false); // 2. Duplicamos la línea de arriba

  const [reloadTable, setReloadTable] = useState(false);
  const [usuarioLocal, setUsuarioLocal] = useState("");

  // Agrega un nuevo estado para almacenar el ID del usuario a editar
  const [editUserId, setEditUserId] = useState(null);
  // Agrega un nuevo estado para almacenar los datos del usuario a editar
  const [editUserData, setEditUserData] = useState(null);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const [users, setUsers] = useState([]);

  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleDelete = (id) => {
    // setPruebaModal(true); // Ponemos la variable azul que declaramos arriba
    setDeleteContact(true);
    setDeleteUserId(id);
  };
  function closeModal() {
    //Agregar tu variable aZUL y ponerla en false
    setPruebaModal(false);

    setDeleteContact(false);
    setDeleteUserId(null);
  }

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      localStorage.setItem("isAuthenticated", "false");
      storedAuth = "false";
    }
    if (storedAuth == "false") {
      navigate("/login");
    }
  }, []);

  // Obtiene los usuarios en la tabla (GET)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(BaseUrl + "/api/users");
      let nombreusuario = localStorage.getItem("userName");
      setUsuarioLocal(nombreusuario);
      const data = await response.json();
      setUsers(data);
      paginate("#tableUsuarios", 10);
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
  const handleDeleteUser = async (deleteUserId) => {
    try {
      const response = await fetch(BaseUrl + `/api/users/${deleteUserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        setDeleteContact(false);
        setMessage("Usuario eliminado exitosamente");
        setMessageClass("success");
      } else {
        setMessage("Error al eliminar, intenta de nuevo");
        setMessageClass("error");
        console.error("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
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
    const userData = users.data.find((user) => user.id === userId);
    setEditUserId(userId);
    setEditUserData(userData);
    setUsuario(userData.nombreusuario);
    setNombre(userData.nombre);
    setCorreo(userData.correoelectronico);
    setContraseña(userData.contraseña);
    setPerfil(userData.perfil);
  };

  return (
    <div
      style={{ display: "flex", backgroundColor: "whitesmoke" }}
      className="flex h-screen"
    >
      {/* 3 Inicias a copiar desde acá */}
      <Modal
        ariaHideApp={false}
        id="root"
        isOpen={deleteModal}
        onRequestClose={closeModal}
        contentLabel="Eliminar usuario"
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
        <h3 className="text-center text-lg font-semibold">Eliminar usuario</h3>
        <p>¿Estás seguro de que quieres eliminar al usuario?</p>
        <div className="flex flex-row justify-between">
          <button className="btn-red flex-1 p-2 m-1" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="btn-green flex-1 p-2 m-1"
            onClick={() => handleDeleteUser(deleteUserId)}
          >
            Eliminar
          </button>
        </div>
      </Modal>
      {/* Terminas acá de seleccionar todas las líneas y Ctrl+V */}
      <Modal
        ariaHideApp={false}
        id="prueba"
        isOpen={pruebaModal} // Ponemos la variable amarilla que declaramos arriba
        onRequestClose={closeModal}
        contentLabel="Prueba Modal"
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
        {/* Formato del Modal,todo esto */}
        <h3 className="text-center text-lg font-semibold">Prueba Modal</h3>
        <p>Prueba Modal</p>
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
        {/* 2. Agregamos formato al Tooltip y definimos un "id" */}
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
                <h1 className="tamaño_fuente">Usuarios</h1>
              </div>
              <div className="flex sm:flex-row w-40% flex-col">
                <form onSubmit={handleSubmit} className="mt-4 sm:w-full mr-4">
                  <div className="">
                    <div className="font-medium" htmlFor="title">
                      Nombre del usuario
                    </div>
                    <input
                      value={nombreusuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      className="m-0 w-full p-2 in2"
                      placeholder="Ingrese usuario"
                    ></input>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Nombre completo
                    </div>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full p-2 in2"
                      placeholder="Ingrese nombre completo"
                    ></input>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Correo Electrónico
                    </div>
                    <input
                      value={correoelectronico}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full p-2 in2"
                      placeholder="Ingrese correo electrónico"
                    ></input>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="description">
                      Contraseña
                    </div>
                    <div className="relative">
                      <input
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        className="w-full p-2 in2 btnUsarios"
                        type={showPassword ? "text" : "password"}
                        id="contraseña"
                        placeholder="Ingresa tu contraseña"
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye color="#035165" />
                        ) : (
                          <EyeSlash color="#0d9488" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <select
                      value={perfil}
                      onChange={(e) => setPerfil(e.target.value)}
                      className="selectUsuarios ring-teal-600 bg-neutral-100 ring-2 rounded-md border-transparent-100 text-cyan-950 mr-6 p-2.5 w-z focus:border-cyan-900"
                    >
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        hidden
                      >
                        Seleccionar perfil
                      </option>
                      <option value="Editor">Editor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <button type="submit" className="entr tracking-widest mt-4">
                      {editUserId !== null
                        ? "Actualizar usuario"
                        : "Añadir usuario"}
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
                            id="tableUsuarios"
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
                                  Perfil
                                </th>
                                <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                  Entradas Redactadas
                                </th>
                                <th className="border-teal-600 border-r-2 encabezadoTabla"></th>
                              </tr>
                            </thead>

                            <tbody>
                              {users.data &&
                                users.data
                                  .filter((userInfo) => {
                                    return (
                                      usuarioLocal !== userInfo.nombreusuario
                                    ); // Filter out entries that match the username
                                  })
                                  .sort((a, b) => a.id - b.id) // Sort categories by ascending ID
                                  .map((userInfo) => (
                                    <tr
                                      key={userInfo.id}
                                      className="tr-body border-2 border-teal-600"
                                    >
                                      {/* <td className="p-1 w-5">{userInfo.id}</td> */}
                                      <td className="border-2 border-teal-600 p-1">
                                        {userInfo.nombre}
                                      </td>
                                      <td className="border-2 border-teal-600 p-1">
                                        {userInfo.perfil}
                                      </td>
                                      <td className="border-2 border-teal-600 p-1">
                                        {userInfo.entradas}
                                      </td>
                                      <td className="flex items-center justify-center">
                                        <button
                                          className="btn-yellow p-2 m-1"
                                          // Estas tres líneas son importantes
                                          data-tooltip-id="editar" // Anteriormente definimos id
                                          data-tooltip-place="top" // Lugar Tooltip
                                          data-tooltip-content="Editar" // Contenido
                                          onClick={() =>
                                            loadEditUserData(userInfo.id)
                                          }
                                        >
                                          <Pencil size={20} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            toggleDelete(userInfo.id)
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

export default usuarios;
