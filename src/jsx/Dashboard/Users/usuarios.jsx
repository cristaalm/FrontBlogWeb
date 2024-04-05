import { useState, useEffect } from "react";
import "../../../css/usuarios.css";
import "../../../css/App.css";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../../Elements/SideBar.jsx";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
    <div style={{ display: "flex", backgroundColor: "whitesmoke" }}>
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
              { icon: <Layers />, text: "Todas" },
              { icon: <PlusSquare />, text: "Añadir Nueva" },
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
          <div className="contenedor_cuadricular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Usuarios</h1>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="mt-4 w-full sm:w-1/2">
                  <div className="">
                    <div className="font-medium" htmlFor="title">
                      Nombre del usuario
                    </div>
                    <input
                      className="m-0 w-full sm:w-1/2 p-2 in2 "
                      placeholder="Ingrese usuario"
                    ></input>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Nombre completo
                    </div>
                    <input
                      className="w-full sm:w-1/2 p-2 in2"
                      placeholder="Ingrese nombre completo"
                    ></input>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="title">
                      Correo Electrónico
                    </div>
                    <input
                      className="w-full sm:w-1/2 p-2 in2"
                      placeholder="Ingrese correo electrónico"
                    ></input>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium" htmlFor="description">
                      Contraseña
                    </div>
                    <input
                      // className="w-full sm:w-1/2 p-2 in3 mt-2 rounded focus:outline-none text-cyan-950 border-black ring-cyan-950 ring-1"
                      className="w-full sm:w-1/2 p-2 in2"
                      type="password"
                      style={{ WebkitTextSecurity: "disc" }}
                      id="contraseña"
                      placeholder="Ingresa tu contraseña"
                    />
                  </div>
                  <div className="mt-4">
                    {/* bg-amber-50 */}
                    <select className="ring-teal-600 bg-neutral-100 ring-2 rounded-md border-transparent-100 text-cyan-950 mr-6 p-2.5 w-full focus:border-cyan-900">
                      <option value="Editor">Editor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <button type="submit" className="entr tracking-widest mt-4">
                      Añadir usuario
                    </button>
                  </div>
                </div>
                <div className="mt-4 w-full sm:w-1/2">
                  {/* <div className="bg-white p-6"> */}
                  <div className="">
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
                                  <button className="btn-green mr-2">
                                    Editar
                                  </button>
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
                                  <button className="btn-green mr-2">
                                    Editar
                                  </button>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default usuarios;
