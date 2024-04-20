import React, { useRef, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { createPost } from "../../../js/createPost";
import { Editor } from "@tinymce/tinymce-react";
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
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
function usuarios() {
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      overlayColor: "lemon",
      theme: "dark",
      nextBtnText: '—›',
      prevBtnText: '‹—',
      doneBtnText: '✕',
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
          element: ".entrada1-tour",
          popover: {
            title: "Añadir nueva entrada",
            description: "Esta es la sección para agregar nuevas entradas.",
          },
        },
        {
          element: ".inputentrada",
          popover: {
            title: "Título de la entrada",
            description: "Aquí puedes ingresar el título de la nueva entrada.",
          },
        },
        {
          element: ".selectcat-tour",
          popover: {
            title: "Seleccione su categoría",
            description:
              "Este menú desplegable te permite seleccionar la categoría deseada para tu entrada.",
          },
        },
        {
          element: ".descripcion-tour",
          popover: {
            title: "Descripción",
            description:
              "En este campo, puedes agregar una descripción para tu entrada.",
          },
        },
        {
          element: ".imgdestaca-tour",
          popover: {
            title: "Imagen destacada",
            description:
              "Aquí puedes cargar y previsualizar la imagen que deseas destacar en tu entrada.",
          },
        },
        {
          element: ".tiny-tour",
          popover: {
            title: "Previsualización",
            description:
              "TinyMCE es un editor de texto enriquecido que facilita la creación y edición de contenido web. Explora las opciones de formato, añade imágenes, enlaces y mucho más.",
          },
        },
        {
          element: ".btn-tour",
          popover: {
            title: "Añadir entrada",
            description:
              "Haz clic en este botón para agregar la entrada con toda la información que has proporcionado anteriormente.",
          },
        },
        {
          element: ".btn-iniciar-tour",
          popover: {
            title: "Reiniciar Tour",
            description:
              "Haz clic en este botón para volver a iniciar el tour por la página.",
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
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [tiny, setTiny] = useState("");
  const fileInputRef = useRef(null);

  const [deleteModal, setDeleteContact] = React.useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const handleTinyChange = (content, editor) => {
    setTiny(content);
  };
  const [user, setUser] = useState([]);

  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    // console.log(nombreusuario);
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
    };
    fetchData();
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.tiny.cloud/1/kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2/tinymce/6/tinymce.min.js";
    script.referrerpolicy = "origin";
    document.head.appendChild(script);

    script.onload = () => {
      window.tinymce.init({
        selector: "#entryDescription",
        apiKey: "af8109ckb7vf2pm3g5io2hw55z53nxfdnkak2yc324pnvqa3",
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | bold italic underline strikethrough | link image media table | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        setup: (editor) => {
          editor.on("change", () => {
            const content = editor.getContent();
            setTiny(content);
          });
        },
      });
    };

    return () => {
      window.tinymce?.remove("#entryDescription");
    };
  }, []);
  // const [categories, setCategories] = useState([]);
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
      setCategories(data);
    };
    fetchData();
  }, []);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreviewImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = localStorage.getItem("userName");
      await createPost(
        title,
        tiny,
        categoryId,
        previewImage,
        usuario,
        descripcion
      );
      navigate("/post/all");
      alert("Entrada creada exitosamente.");
    } catch (error) {
      console.error("Post creation failed:", error);
      setMessage("An error occurred while creating the post");
      setMessageClass("error");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

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

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const cleanForm = () => {
    setUsuario("");
    setNombre("");
    setCorreo("");
    setContraseña("");
    setPerfil([]);
  };

  return (
    <div
      style={{ display: "flex", backgroundColor: "whitesmoke" }}
      className="flex h-screen"
    >
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
          id="manual"
          style={{
            backgroundColor: "#b8ddd6",
            color: "#035165",
            zIndex: "999",
          }}
        />
        <main className="todo_espacio flex-1">
          <div className="contenedor_cuadricular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente entrada1-tour">
                  Añadir nueva entrada
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
                      src="../../../../public/img/logoRedB.png"
                      className="rounded h-full w-full"
                      alt="Logo RedB"
                    />
                  </button>
                )}
              </div>

              <div className="flex sm:flex-row w-full flex-col">
                <form onSubmit={handleSubmit} className="mt-2 mr-4 p-2 w-100">
                  <div className="inputentrada">
                    <div className="font-medium" htmlFor="title">
                      Título de entrada
                    </div>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="m-0 w-full p-2 in2"
                      placeholder="Ingrese título"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="selectUsuarios ring-teal-600 bg-neutral-100 ring-2 selectcat-tour rounded-md border-transparent-100 text-cyan-950 mr-6 p-2.5 w-z focus:border-cyan-900"
                    >
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        hidden
                      >
                        Seleccione su categoría...
                      </option>
                      {categories.data &&
                        categories.data.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.nombre}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mt-2 descripcion-tour">
                    <div className="font-medium" htmlFor="title">
                      Descripción
                    </div>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full bg-neutral-100 p-2 in2 mt-2 ring-2 ring-teal-600 rounded"
                      placeholder="Ingrese descripción"
                      maxLength={440}
                    ></textarea>
                    <p className="text-neutral-400 text-sm">
                      Esta descripción será mostrada al usuario visitante.
                    </p>
                  </div>
                  <div className="mt-2 imgdestaca-tour">
                    <div className="font-medium" htmlFor="title">
                      Imagen Destacada
                    </div>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-2 max-w-full h-48 mx-auto"
                      />
                    ) : (
                      <img
                        src="../../../../public/img/upload1.png"
                        alt="Default Preview"
                        className="mt-2 max-w-full h-48 mx-auto"
                      />
                    )}
                    <button
                      type="button"
                      className="pre tracking-widest p-3 mt-4"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <div className="">
                        Subir imagen
                        {/* <ArrowUpFromLine size={20} className="ml-2" /> */}
                      </div>
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
                      className="entr tracking-widest mt-4 btn-tour"
                    >
                      Añadir entrada
                    </button>
                  </div>
                </form>
                <div className="sm:w-full w-60%">
                  <div className="mt-2">
                    <div className="right tiny-tour">
                      <div className="previsualizar">
                        <div className="bottonpre">
                          <h2 className="negt">Previsualización</h2>
                        </div>
                        <div>
                          <div className="form-group tinymce-container">
                            <div className="enter"></div>
                            <Editor
                              id="entryDescription"
                              name="content"
                              value={tiny}
                              onEditorChange={handleTinyChange}
                            />
                          </div>
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
