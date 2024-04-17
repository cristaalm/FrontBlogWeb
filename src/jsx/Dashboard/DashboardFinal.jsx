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
import { driver } from "driver.js";
import { Tooltip } from "react-tooltip";
import "driver.js/dist/driver.css";

function LayoutPost() {
  const driverObj = driver({
    showProgress: true,
      overlayColor: 'lemon',
      theme: 'dark',
    onPopoverRender: (popover, { config, state }) => {
      const firstButton = document.createElement("button");
      firstButton.innerText = "Go to First";
      popover.footerButtons.appendChild(firstButton);
  
      firstButton.addEventListener("click", () => {
        driverObj.drive(0);
      });
    },
    
    steps: [
      { element: '.bienvenida-tour', popover: { title: 'Bienvenido', description: '¡Bienvenido! Estás a punto de embarcarte en un recorrido interactivo por nuestra plataforma. Explora cada sección y descubre todas las funciones que tenemos para ofrecerte. ¡Disfruta del viaje!' } },
      { element: '.dash-tour', popover: { title: 'Secciones', description: 'En este menú, también conocido como sidebar, encontrarás la opcion de entradas. Al dar clic en esta se desplegará un menú con dos secciones: Todas las entradas y Añadir nueva entrada.'} },
      { element: '.cerrar-tour', popover: { title: 'Cerrar Sesión', description: 'Al hacer clic en este botón, cerrarás la sesión del usuario y serás redirigido de vuelta a la página de inicio de sesión.'} },
      { element: '.btn-iniciar-tour', popover: { title: 'Iniciar tour', description: 'Este botón te permitirá iniciar el recorrido por la página en las dos secciones mencionadas anteriormente del sidebar.' } },
    ]
  });
  
  driverObj.drive();
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
              {/* <Tooltip
          id="manual"
          style={{
            backgroundColor: "#b8ddd6",
            color: "#035165",
            zIndex: "999",
          }}
        /> */}
      <div
        style={{
          // width:"13%",
          position: "static",
          height: "100%",
          backgroundColor: "#f0f0f0",
        }}
      >
            <div className="dash-tour">

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
      </div>
      <div className="inicio">
        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Panel de Administración</h1>
                <button
                  
                  data-tooltip-content="Iniciar tour"
                  data-tooltip-id="manual"
                  className="rounded mb-2 h-10 w-10 btn-iniciar-tour"
                  alt="Iniciar Tour"
                >
                  <img
                    src="../../../../public/img/logoRedB.png"
                    className="rounded h-full w-full"
                    alt="Logo RedB"
                  />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default LayoutPost;
