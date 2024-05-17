import React, { useContext, useEffect, useState } from "react";
import "../../../css/Dashboard.css";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../../Elements/SideBar.jsx";
import PreviewComponent from "../../Elements/PreviewComponent.jsx";
import { LayoutDashboard, Users, Book, PlusSquare, Layers, Trash } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { Preview } from "@mui/icons-material";
import { BaseUrl } from "../../../constants/global.js";

function Preview() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const [user, setUser] = useState([]);
  const volverTodos = () => {
    navigate("/post/reciclaje");
  };
  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      navigate("/login");
    }
    if (storedAuth == "false") {
      navigate("/login");
    }
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
    fetchData();
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
        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <button
                  className="rounded-full p-1 px-4 bg-cyan-100"
                  onClick={volverTodos}
                >
                  Volver
                </button>
                <h1 className="tamaño_fuente">Previsualizar entrada</h1>
              </div>
              <div className="w-full">
                <div className="mt-2">
                  <div className="flex flex-col ">
                    <PreviewComponent />
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
export default Preview;
