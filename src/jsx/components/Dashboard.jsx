import { useState, useEffect } from "react";
import "../../css/Dashboard.css";
import "../../css/App.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isEntriesDropdownOpen, setIsEntriesDropdownOpen] = useState(false);
  let navigate = useNavigate();

  const toggleEntriesDropdown = () => {
    setIsEntriesDropdownOpen(!isEntriesDropdownOpen);
  };
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
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

  return (
    <div className="inicio">
      <aside className="contenedor_logo">
        <div className="logo_i">
          <span className="negritas">Logo</span>
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
              <div className="entradaChil">
                <img
                  src="/public/img/logo without bg.png"
                  width="50px;"
                  alt="Imagen del Usuario"
                />
                <span className="hello">¡Hola, Admin!</span>
              </div>
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
                categorías
              </div>
              <select className="diseño">
                <option value="categoria1">seleccione categoria</option>
                <option value="categoria2">Categoría 2</option>
              </select>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="description">
                Descripción
              </div>
              <textarea className="cuadro_txt"></textarea>
            </div>
            <div className="margen_boton">
              <button type="button" className="pre">
                Previsualizar
              </button>
              <div className="liquid"></div>
            </div>
            <div className="margen_boton">
              <button type="button" className="btn">
                Imagen Destacada
              </button>
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
  );
}

export default Dashboard;

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
