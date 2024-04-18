import React, { useRef, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import { editPost } from "../../../js/editPost.js";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, Link, useNavigate } from "react-router-dom";

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

function EditPublish() {
  const { id } = useParams();
  const navigate = useNavigate(); // Obtiene la función de navegación

  // Datos del formulario
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [tiny, setTiny] = useState("");
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

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
    const fetchCategoriesData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.tiny.cloud/1/kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2/tinymce/6/tinymce.min.js";
    script.referrerpolicy = "origin";

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

    document.head.appendChild(script);

    return () => {
      window.tinymce?.remove("#entryDescription");
    };
  }, []);

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth==null){
      navigate("/login");
    }
    if (storedAuth=="false"){
      navigate("/login");
    }
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
        setTiny(data.contenido);
        setTitle(data.titulo);
        setCategoryId(data.idcategoria);
        setDescripcion(data.descripcion);
        setPreviewImage(data.imgdestacada);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]); // Se agrega `id` como dependencia para que se vuelva a llamar cuando cambie

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
      console.log(
        title,
        tiny,
        categoryId,
        previewImage,
        usuario,
        descripcion,
        id
      );
      await editPost(
        title,
        tiny,
        categoryId,
        previewImage,
        usuario,
        descripcion,
        id
      );
      navigate("/post/all");
      alert("Entrada actualizada exitosamente.");
    } catch (error) {
      console.error("Post creation failed:", error);
      setMessage("An error occurred while creating the post");
      setMessageClass("error");
    }
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
        <main className="todo_espacio flex-1">
          <div className="contenedor_cuadricular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
              </div>
              <div className="flex sm:flex-row w-full flex-col">
                <form onSubmit={handleSubmit} className="mt-2 mr-4 p-2 w-100">
                  <div className="">
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
                      className="selectUsuarios ring-teal-600 bg-neutral-100 ring-2 rounded-md border-transparent-100 text-cyan-950 mr-6 p-2.5 w-z focus:border-cyan-900"
                    >
                      <option className="text-gray-400" disabled hidden>
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
                  <div className="mt-2">
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
                  <div className="mt-2">
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
                    />
                  </div>
                  <div>
                    <button type="submit" className="entr tracking-widest mt-4">
                      Actualizar entrada
                    </button>
                  </div>
                </form>
                <div className="sm:w-full w-60%">
                  <div className="mt-2">
                    <div className="right">
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
                              apiKey="af8109ckb7vf2pm3g5io2hw55z53nxfdnkak2yc324pnvqa3"
                              value={tiny}
                              onEditorChange={setTiny}
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

export default EditPublish;
