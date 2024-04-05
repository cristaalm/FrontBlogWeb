import "../../css/Dashboard.css";
import Footer from "../Elements/FooterU";
import Sidebar, {
  SidebarItem,
  SidebarItemWithSubItems,
} from "../Elements/SideBar";
import NewPost from "./Post/newPost";
import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LayoutPost() {
  let navigate = useNavigate();

  const dashboard = () => {
    navigate("/login");
  };
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
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            onClick={dashboard}
          />
          <SidebarItemWithSubItems
            icon={<Book className="text-white" />}
            text="Entradas"
            subItems={[
              { icon: <Layers />, text: "Todas" },
              { icon: <PlusSquare />, text: "Añadir Nueva" },
              // { icon: <Layers />, text: "Categorías" }
            ]}
          />
          <SidebarItem icon={<Layers />} text="Categorías" />
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
