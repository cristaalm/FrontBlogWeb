import { useState, useEffect } from "react";
import { createPost } from "../../js/createPost";
import "../../css/Dashboard.css";
import "../../css/App.css";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Footer from "./elements/Footer";

function newPost() {
  const navigate = useNavigate(); // Obtiene la función de navegación
  // const [showModal, setShowModal] = useState(false);
  // const [imageLink, setImageLink] = useState("");
  // const [imageWidth, setImageWidth] = useState("");
  // const [imageHeight, setImageHeight] = useState("");
  // const handleAddImage = () => {
  //   // Lógica para insertar la imagen en el editor de texto
  //   console.log("Link de la imagen:", imageLink);
  //   console.log("Ancho de la imagen:", imageWidth);
  //   console.log("Alto de la imagen:", imageHeight);
  //   // Aquí puedes realizar la lógica para insertar la imagen en el editor de texto si es necesario
  //   setShowModal(false); // Cierra el modal después de procesar la imagen
  // };
  // const handleToggleModal = () => {
  //   setShowModal(!showModal);
  // };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Aquí puedes hacer una solicitud a tu API para obtener las categorías
    // Supongamos que la respuesta de la API es un array de objetos con propiedades 'id' y 'name'
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/categories"
      );
      const data = await response.json();
      setCategories(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const toggleEntriesDropdown = () => {
    setIsEntriesDropdownOpen(!isEntriesDropdownOpen);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(titulo, contenido, idcategoria, img, usuario);
      // console.log(id);
      if (password === passwordConfirm) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setMessage("New password saved correctly.");
        setMessageClass("success");
      } else {
        setMessage("Passwords do not match");
        setMessageClass("error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("An error occurred while resetting the password");
      setMessageClass("error");
    }
  };

  return (
    <div>
      <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
        chin
      </a>
      <div className="inicio">
        <aside className="contenedor_logo">
          <div className="logo_i">
            <span className="negritas">AquaVision</span>
          </div>
          <nav className="margen_inferior">
            <div className="entradas">
              <div className="sections-header">SECCIONES</div>
              <select className="diseñosec">
                <option value="categoria0">entradas</option>
                <option value="categoria1">todas</option>
                <option value="categoria2">añadir nueva</option>
                <option value="categoria3">categorias</option>
              </select>
              <div className="entradas">
                <div className="sectionsUS">USUARIO</div>
              </div>
              <div className="entradas">
                <button onClick={cerrarSesion} className="sesion">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </nav>
        </aside>

        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
                {/* <div className="entradaChil">
                <img
                  src="/public/img/logo without bg.png"
                  width="50px;"
                  alt="Imagen del Usuario"
                />
                <span className="hello">¡Hola, Admin!</span>
              </div> */}
              </div>
            </div>
          </div>
          <div className="todo_espacio2">
            <div className="left">
              <div className="margen_boton">
                <div className="ancho" htmlFor="title">
                  Título de Entrada
                </div>
                <textarea className="cuadro_txt"></textarea>
              </div>
              <div className="margen_boton">
                <div className="ancho" htmlFor="category">
                  Categorías
                </div>
                <select className="diseño">
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
                <textarea className="cuadro_txt"></textarea>
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
            </div>
            <div className="right">
              <div className="previsualizar">
                <div className="bottonpre">
                  <h2 className="negt">Previsualización</h2>
                </div>
                <div className="border">
                  <div className="form-group tinymce-container">
                    <div className="enter"></div>
                    <textarea id="entryDescription"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
     {/*<Footer />*/} 
    </div>
  );
}

export default newPost;

/*    <div className="dashboard">
        <aside className="sidebar">
          <img src="src/img/logo without bg.png"  width="100px" height="100px"   alt="pene" />
          <div className="menu">
            <div className="sections-header">SECCIONES</div>
            <div className="menu-item" onClick={toggleEntriesDropdown}>
              <div className={`menu-item ${isEntriesDropdownOpen ? 'minus' : 'plus'}`} onClick={toggleEntriesDropdown}>
                Entradas
              </div>
            </div>
            {isEntriesDropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item">Todas</div>
                <div className="dropdown-item">Añadir nueva</div>
                <div className="dropdown-item">Categorías</div>
              </div>
            )}
            <div className="menu-item">Usuarios</div>
          </div>

        </aside>
       Botones y Selector de Categorías ahora se mueven aquí 
        <main className="content">
          <header>
            <div className="content-header">
              <h1>Añadir nueva entrada</h1>
              <div className="user-greeting">¡Hola, administrador!</div>
            </div>
          </header>
          <div className="sidebar-actions">
            <select id="categorySelect">
              <option>Seleccione categoría...</option>
              Las opciones de categoría irían aquí 
            </select>
            <button type="button" id="previewButton">Previsualizar</button>
            <button type="button" id="addImageButton">Imagen Destacada</button>
            <button type="submit" id="saveButton">Guardar Entrada</button>
          </div>

          <div className="entry-form">
            <div className="form-group">
              <input htmlFor="entryTitle" type="text" placeholder='Ingresa titulo'></input> 
            </div>


            El editor TinyMCE se coloca aquí 

          <div className="form-group tinymce-container">
              <label htmlFor="entryDescription">Descripción</label>
              <textarea id="entryDescription"></textarea>
            </div> 
            
          </div>
        </main>
      </div>
  );
}

export default Dashboard;*/
