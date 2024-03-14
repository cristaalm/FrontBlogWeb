import { useState, useEffect } from "react";
import "../../css/usuarios.css";
import "../../css/App.css";
import { useNavigate } from "react-router-dom";

function usuarios() {
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
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
              <h1 className="tamaño_fuente">Usuarios</h1>
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
                Nombre del usuario
              </div>
              <textarea className="cuadro_txt"  placeholder="Ingrese usuario"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="title">
                Nombre completo
              </div>
              <textarea className="cuadro_txt"  placeholder="Ingrese completo"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="title">
                Correo Electrónico
              </div>
              <textarea className="cuadro_txt"  placeholder="Ingrese correo electrónico"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="description">
                Contraseña
              </div>
              <input className="cuadro_txt" type="password" id="contraseña" placeholder="Ingresa tu contraseña"/>
            </div>
            <div className="margen_boton">
              <select className="diseño">
                <option value="categoria1">Perfil</option>
                <option value="categoria2">Categoría 2</option>
              </select>
            </div>
            <div>
              <button type="submit" className="entr">
                Añadir usuario
              </button>
            </div>
          </div>
          <div className="right">
            <div className="bg-white p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Entradas</h1>
                </div>
                <div className="overflow-x-auto">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="header">
                        <tr className="tr-header">
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Perfil</th>
                          <th>Entradas</th>
                          <th>-----</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr-body">
                          <td>1</td>
                          <td>Cat1</td>
                          <td>Informativo</td>
                          <td>
                            <td>1</td>
                          </td>
                          <td>
                            <button className="btn-green mr-2">Editar</button>
                            <button className="btn-yellow mr-2">D</button>
                          </td>
                        </tr>
                        <tr className="tr-body">
                          <td>2</td>
                          <td>Cat2</td>
                          <td>Informativo</td>
                          <td className="sep">
                          <td>6</td>
                          </td>
                          <td>
                            <button className="btn-green mr-2">Editar</button>
                            <button className="btn-yellow mr-2">D</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default usuarios;