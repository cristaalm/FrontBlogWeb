import React, { useRef, useEffect, useState } from "react";
import "../../css/Dashboard.css";
import Footer from "../Elements/FooterU";
// import NewPost from "./Post/newPost";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../Elements/SideBar";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/index.css";

function LayoutPost() {
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
    fetchData();
  }, []);

  let navigate = useNavigate();
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
                <h1 className="tamaño_fuente">Panel de Administración</h1>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default LayoutPost;
