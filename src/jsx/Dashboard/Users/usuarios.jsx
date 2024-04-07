import React, { useContext, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { FormattedMessage, useIntl } from "react-intl"; // Importa FormattedMessage y useIntl
import { createUser } from "../../../js/createUser";

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

  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [deleteModal, setDeleteContact] = React.useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const [users, setUsers] = useState([]);
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
    setDeleteUserId(id);
  };
  function closeModal() {
    setDeleteContact(false);
    setDeleteUserId(null);
  }

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      localStorage.setItem("isAuthenticated", "false");
      storedAuth = "false";
    }
    console.log("stored", storedAuth);
    if (storedAuth == "false") {
      navigate("/login");
    }
  }, []);
  const logOff = async () => {
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      localStorage.removeItem("isAuthenticated");
    }
  };
  // Obtiene los usuarios en la tabla (GET)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/users"
      );
      const data = await response.json();
      setUsers(data);
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
      const response = await fetch(
        `https://backblogweb.onrender.com/api/users/${deleteUserId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
        console.log(`Usuario con ID ${deleteUserId} eliminado exitosamente`);
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

  //Crea usuario (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(
        nombreusuario,
        nombre,
        correoelectronico,
        contraseña,
        perfil
      );
      setReloadTable(!reloadTable); // Cambia el estado para recargar la tabla
      setMessage("Usuario creado exitosamente");
      setMessageClass("success");
    } catch (error) {
      setMessage("Error al crear, intenta de nuevo");
      setMessageClass("error");
    }
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
    <div style={{ display: "flex", backgroundColor: "whitesmoke" }}>
      <Modal
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
        <h2>Eliminar usuario</h2>
        <p>
          ¿Estás seguro de que quieres eliminar al usuario con ID {deleteUserId}
          ?
        </p>
        <button className="btn-red p-2 m-1" onClick={closeModal}>
          Cancelar
        </button>
        <button
          className="btn-red p-2 m-1"
          onClick={() => handleDeleteUser(deleteUserId)}
        >
          Eliminar
        </button>
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
        <main className="todo_espacio">
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
                      Añadir usuario
                    </button>
                  </div>
                </form>
                <div className="sm:w-full w-60%">
                  <div className="">
                    <div className="flex flex-col space-y-4">
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
                                  Perfil
                                </th>
                                <th className="border-neutral-100 border-r-2 encabezadoTabla">
                                  Entradas
                                </th>
                                <th className="border-teal-600 border-r-2 encabezadoTabla"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.data &&
                                users.data.map((userInfo) => (
                                  <tr className="tr-body border-2 border-teal-600">
                                    <td className="p-1 w-5">{userInfo.id}</td>
                                    <td className="border-2 border-teal-600 p-1">
                                      {userInfo.nombre}
                                    </td>
                                    <td className="border-2 border-teal-600 p-1">
                                      {userInfo.perfil}
                                    </td>
                                    <td className="border-2 border-teal-600 p-1">
                                      #
                                    </td>
                                    <td className="flex items-center justify-center">
                                      <button
                                        className="btn-yellow p-2 m-1"
                                        data-tooltip-id="editar"
                                        data-tooltip-place="top"
                                        data-tooltip-content="Editar"
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
