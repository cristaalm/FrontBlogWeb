import React, { useRef, useEffect, useState } from "react";
import "../../../css/usuarios.css";
import { Tooltip } from "react-tooltip";
import { editPost } from "../../../js/editPost.js";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const [isValidCategory, setIsValidCategory] = useState(false);
  const [isValidImage, setIsValidImage] = useState(false);
  const [isValidInput, setIsValidInput] = useState({ category: false });
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isValidTiny, setIsValidTiny] = useState(false); // null, true, o false para la validación

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

 
  const [user, setUser] = useState([]);
  const handleTinyChange = (content, editor) => {
    setTiny(content);
    setIsValidTiny(content.trim() !== '');  // Verifica que el contenido no sea solo espacios en blanco

  };
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setIsValidTitle(value.trim() !== '');
  };
  const handleChangeCategory = (e) => {
    const value = e.target.value;
    setCategoryId(value);
    setIsValidInput({...isValidInput, category: value !== ''}); // Valida si se ha seleccionado una categoría no vacía
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescripcion(value);
    setIsValidDescription(value.trim() !== '');  // Actualiza la validación según el contenido
  };
  useEffect(() => {
    setIsValidTitle(title.trim() !== '');
}, [title]);

useEffect(() => {
    setIsValidDescription(descripcion.trim() !== '');
}, [descripcion]);

useEffect(() => {
    setIsValidCategory(categoryId !== '');
}, [categoryId]);
useEffect(() => {
  // Si usas alguna validación basada en la imagen, asegúrate de que también se resetee correctamente
  setIsValidImage(previewImage ? true : false);
}, [previewImage]); // Dependencia del efecto al estado 'previewImage'
useEffect(() => {
  // Este useEffect observa los cambios en `tiny` y actualiza `isValidTiny` en consecuencia.
  setIsValidTiny(tiny.trim() !== '');
}, [tiny]);  // A
useEffect(() => {
  // Este useEffect verifica si `categoryId` ha sido seleccionado adecuadamente
  setIsValidInput(prevState => ({
      ...prevState,
      category: categoryId !== ''
  }));
}, [categoryId]); // Dependencia en `categoryId` para reaccionar a sus cambios.

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
    };
    const fetchCategoriesData = async () => {
      const response = await fetch(BaseUrl + "/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    // script.src =
    //   "https://cdn.tiny.cloud/1/kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2/tinymce/6/tinymce.min.js";
    // script.referrerpolicy = "origin";

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
    if (storedAuth == null) {
      navigate("/login");
    }
    if (storedAuth == "false") {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + `/api/entradas/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setTiny(data.contenido);
        setTitle(data.titulo);
        setCategoryId(data.idcategoria);
        setDescripcion(data.descripcion);
        setPreviewImage(data.imgdestacada);
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
    if (!isValidTitle || !isValidDescription || !isValidCategory) {
      alert("Por favor, asegúrate de que todos los campos están correctamente llenados y validados.");
      return;
  }
    try {
      const usuario = localStorage.getItem("userName");
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
  const volverTodos = () => {
    navigate("/post/all");
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
              <button
                  className="rounded-full p-1 px-4 bg-cyan-100"
                  onClick={volverTodos}
                >
                  Volver
                </button>
                <h1 className="tamaño_fuente">Editar entrada</h1>
              </div>
              <div className="flex sm:flex-row w-full flex-col">
                <form onSubmit={handleSubmit} className="mt-2 mr-4 p-2 w-100">
                  <div className="">
                    <div className="font-medium" htmlFor="title">
                      Título de entrada
                    </div>
                    <input
                      value={title}
                      onChange={handleTitleChange}
                      className={`m-0 w-full p-2 in2 ${isValidTitle === false ? 'input-error' : isValidTitle === true ? 'input-success' : ''}`}
                      placeholder="Ingrese título"
                    ></input>
                    {isValidTitle === false && <div className="validation-message">Campo incompleto</div>}

                  </div>
                  <div className="mt-4">
                    <select
                      value={categoryId}
                      onChange={handleChangeCategory}                     
                      className={`selectUsuarios ring-teal-600 bg-neutral-100 ring-2 selectcat-tour rounded-md border-transparent-100 text-cyan-950 mr-6 p-2.5 w-z focus:border-cyan-900 ${isValidInput.category ?   'input-success': isValidInput.category ? '' : 'input-error'}`}
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
                    {isValidInput.category === false && <div className="validation-message">Seleccione una Categoría</div>}
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Descripción
                    </div>
                    <textarea
                      value={descripcion}
                      onChange={handleDescriptionChange}
                      className={`w-full bg-neutral-100 p-2 in2 mt-2 ring-2 ring-teal-600 rounded ${isValidDescription ? 'input-success' : 'input-error'}`}
                      placeholder="Ingrese descripción"
                      maxLength={440}
                    ></textarea>
                    {isValidDescription === false && <div className="validation-message">La descripción no puede estar vacía</div>}
                    <p className="text-neutral-400 text-sm">
                      Esta descripción será mostrada al usuario visitante.
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Imagen Destacada
                    </div>
                    {loading && <div className="validation-message">Cargando imagen...</div>}
                    {uploadError && <div className="validation-message text-red-500">{uploadError}</div>}
                    {isValidImage === false && <div className="validation-message text-red-500">La imagen no puede estar vacía y debe ser válida</div>}
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        onClick={() => fileInputRef.current.click()}
                        className="mt-2 max-w-full h-48 mx-auto cursor-pointer"
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
                              apiKey="kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2"
                              value={tiny}
                              onEditorChange={setTiny}
                            />
                            {isValidTiny === false && <div className="validation-message">El editor no puede estar vacío</div>}

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
