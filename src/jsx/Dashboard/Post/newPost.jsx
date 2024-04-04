import { useState, useEffect } from "react";
import { createPost } from "../../../js/createPost";
import "../../../css/Elements.css";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";


function newPost() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [tiny, setTiny] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [isEntriesDropdownOpen, setIsEntriesDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleTinyChange = (content, editor) => {
    setTiny(content);
  };
  // const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);
  
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

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      localStorage.setItem("isAuthenticated", "false");
      storedAuth = "false";
    }
    if (storedAuth === "false") {
      navigate("/login");
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(tiny);
      const usuario = localStorage.getItem("userName");
      await createPost(title, tiny, categoryId, description, usuario);
      setTimeout(() => {
        navigate("/crud");
      }, 1000);
      setMessage("New post saved correctly.");
      setMessageClass("success");
    } catch (error) {
      console.error("Post creation failed:", error);
      setMessage("An error occurred while creating the post");
      setMessageClass("error");
    }
  };

  return (
    <div className="inicio">
      <main className="todo_espacio">
        <div className="todo_espacio2">
          <div className="left">
            <form onSubmit={handleSubmit}>
              <div className="margen_boton">
                <div className="ancho" htmlFor="title">
                  Título de Entrada
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="cuadro_txt"
                />
              </div>
              <div className="margen_boton">
                <div className="ancho" htmlFor="category">
                  Categorías
                </div>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="diseño"
                >
                  <option value="">Seleccione su categoría...</option>
                  {categories.data &&
                    categories.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div className="margen_boton">
                <div className="ancho" htmlFor="description">
                  Descripción
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="cuadro_txt"
                ></textarea>
              </div>
              <div className="margen_boton">
                <button
                  type="button"
                  className="pre"
                  onClick={() => window.open("/preview-post", "_blank")}
                >
                  Previsualizar
                </button>
                <div className="liquid"></div>
              </div>
              <div className="margen_boton">
                <button type="button" className="pre">
                  Imagen Destacada
                </button>
                <div className="liquid"></div>
              </div>
              <div>
                <button type="submit" className="entr">
                  Guardar Entrada
                </button>
              </div>
            </form>
          </div>

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
                    value={tiny}
                    onEditorChange={handleTinyChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default newPost;
