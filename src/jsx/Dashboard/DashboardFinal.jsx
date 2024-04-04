// import "../../css/Dashboard.css";
import Footer from "../Elements/FooterU";
import Sidebar, { SidebarItem, SidebarItemWithSubItems} from "../Elements/SideBar";
import NewPost from "./Post/newPost";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";

function LayoutPost() {
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          // width: "250px",
          height: "100%",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarItemWithSubItems
            icon={<Book className="text-white"/>}
            text="Entradas"
            subItems={[
              { icon: <Layers />, text: "Todas" },
              { icon: <PlusSquare />, text: "Añadir Nueva" },
              { icon: <Layers />, text: "Categorías" }
            ]}
          />
          <SidebarItem icon={<Users />} text="Usuario" />
        </Sidebar>
      </div>
      <div className="inicio">
        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default LayoutPost;
