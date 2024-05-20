import React, { useRef, useEffect, useState } from "react";
import "../../css/Dashboard.css";
import Pie from "../Elements/PieChart.jsx";
import BarHorizontal from "../Elements/BarHorizontalChart.jsx";
// import NewPost from "./Post/newPost";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../Elements/SideBar";
import {
  LayoutDashboard,
  Trash,
  Users,
  Book,
  PlusSquare,
  Layers,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/index.css";
import { driver } from "driver.js";
import { Tooltip } from "react-tooltip";
import "driver.js/dist/driver.css";
import { BaseUrl } from "../../constants/global";

function LayoutPost() {
  const [user, setUser] = useState([]);
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      overlayColor: "lemon",
      theme: "dark",
      nextBtnText: "—›",
      prevBtnText: "‹—",
      doneBtnText: "✕",
      onPopoverRender: (popover, { config, state }) => {
        const firstButton = document.createElement("button");
        const icon = document.createElement("img");
        icon.src = "/img/refresh.png"; // Reemplaza "ruta/al/icono.svg" con la ruta de tu icono SVG
        icon.width = 24; // Ajusta el ancho según sea necesario
        icon.height = 24; // Ajusta la altura según sea necesario
        firstButton.appendChild(icon);
        popover.footerButtons.appendChild(firstButton);

        firstButton.addEventListener("click", () => {
          driverObj.drive(0);
        });
      },

      steps: [
        {
          element: ".bienvenida-tour",
          popover: {
            title: "Bienvenidos",
            description:
              "AquaVision te da la bienvenida. Estás a punto de embarcarte en un emocionante recorrido interactivo por nuestra plataforma. Explora cada sección y descubre la amplia variedad de funciones que tenemos para ofrecerte. ¡Disfruta de esta aventura!",
          },
        },
        {
          element: ".dash-tour",
          popover: {
            title: "Secciones",
            description:
              "En este menú, también conocido como menú lateral, encontrarás la opción de entradas. Al dar clic en esta se desplegará un menú con dos secciones: Todas las entradas y Añadir nueva entrada.",
          },
        },
        {
          element: ".cerrar-tour",
          popover: {
            title: "Cerrar Sesión",
            description:
              "Al hacer clic en este botón, cerrarás la sesión del usuario y serás redirigido de vuelta a la página de inicio de sesión.",
          },
        },
        {
          element: ".btn-iniciar-tour",
          popover: {
            title: "Iniciar tour",
            description:
              "Este botón te permitirá iniciar el recorrido por la página en las dos secciones mencionadas anteriormente del menú lateral.",
          },
        },
      ],
    });
    driverObj.drive();
  };

  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null || storedAuth === "false") {
      navigate("/login");
      return; // Exit early if authentication is not valid
    }

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
      if (!data.tour) {
        // Show the tour
        startTour();
        // Update the tour status in the backend
        await fetch(BaseUrl + "/api/users/change-tour", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombreusuario }),
        });
      }
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
      </div>
      <div className="inicio">
        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Panel de Administración</h1>
                {user.rol != "Administrador" && (
                  <button
                    onClick={startTour}
                    data-tooltip-content="Iniciar tour"
                    data-tooltip-id="manual"
                    className="rounded mb-2 h-10 w-10 btn-iniciar-tour"
                    alt="Iniciar Tour"
                  >
                    <img
                      src="/img/logoRedB.png"
                      className="rounded h-full w-full"
                      alt="Logo RedB"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-4/12">
              <BarHorizontal />
            </div>
            <div className="w-full md:w-6/12">
              <Pie />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default LayoutPost;
