import { useState, useEffect } from "react";
import "../../../css/Dashboard.css";
import "../../../css/App.css";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../../Elements/SideBar.jsx";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
function categorias() {
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
    <div style={{ display: "flex" }}>
      <div
        style={{
          // width:"13%",
          position: "static",
          height: "100%",
          backgroundColor: "#f0f0f0",
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
          <main className="todo_espacio">
            <div className="contenedor_cuadicular">
              <div className="margin">
                <div className="entrada">
                  <h1 className="tamaño_fuente">Categorías</h1>
                </div>
              </div>
            </div>
            <div className="todo_espacio2">
    
              <div className="left">
                <div className="margen_boton">
                  <div className="ancho" htmlFor="title">
                    Nombre De La Categoria 
                  </div>
                  <textarea className="cuadro_txt" placeholder="Ingresa Tituo"></textarea>
                </div>
                <div className="margen_boton">
                  <div className="ancho" htmlFor="description">
                    Descripción
                  </div>
                  <textarea className="cuadro_txt" placeholder="Ingresa Descripcion"></textarea>
                </div>
                <div className="margen_boton">
                  <button type="button" className="dest" onClick={handleToggleModal}>
                    Imagen Destacada
                  </button>
                  {showModal && (
              <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <p className="apartadop">Inserta el enlace de la imagen:</p>
                <input className="insertor"
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
                <p className="apartadop">Inserta el ancho de la imagen (en píxeles):</p>
                <input className="insertor"
                  type="number"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value)}
                />
                <p className="apartadop">Inserta el alto de la imagen (en píxeles):</p>
                <input className="insertor"
                  type="number"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(e.target.value)}
                />
                <button className="insert-button" onClick={handleAddImage}>
                  Insertar
                </button>
              </div>
            </div>
              )}
    
                </div>
                <div>
                  <button type="submit" className="entr">
                    Añadir Categoria
                  </button>
                </div>
              </div>
              <div className="right">
                <div className="bg-white p-6">
                  <div className="flex flex-col space-y-4">
                  <div className="overflow-x-auto">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="header">
                          <tr className="tr-header">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Color</th>
                            <th>-----</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="tr-body">
                            <td>1</td>
                            <td>lorem ipssum</td>
                            <td>red</td>
                            <td>
                              <button className="btn-green mr-2">Editar</button>
                              <button className="btn-red mr-2">Eliminar</button>
                            </td>
                          </tr>
                          <tr className="tr-body">
                            <td>2</td>
                            <td>lorem ipssum</td>
                            <td>width</td>
                            <td></td>
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
      </div>
  );
}
    export default categorias;
