import React, { useContext, useEffect, useState } from "react";
import "../../../css/Dashboard.css";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../../Elements/SideBar";
import PreviewComponent from "../../Elements/PreviewComponent.jsx";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { Preview } from "@mui/icons-material";
import { BaseUrl } from "../../../constants/global.js";
function Preview() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      navigate("/login");
    }
    if (storedAuth == "false") {
      navigate("/login");
    } // console.log(nombreusuario);
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
        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Previsualizar nueva entrada</h1>
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
