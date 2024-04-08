import React, { useContext, useEffect, useState } from "react";
import "../../../css/Dashboard.css";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../../Elements/SideBar";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";

function LayoutPost() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const { id } = useParams(); // Obtener el ID de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backblogweb.onrender.com/api/entradas/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setMessage(data.contenido);
        console.log(data.contenido);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
                <h1 className="tamaño_fuente">Previsualizar nueva entrada</h1>
              </div>
              <div className="w-full">
                <div className="mt-2">
                  <div className="flex flex-col">
                    <div className={`message ${messageClass}`}>
                      {message && (
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                      )}
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
export default LayoutPost;
