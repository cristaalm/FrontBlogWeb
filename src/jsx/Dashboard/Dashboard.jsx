import "../../css/Dashboard.css";
import Footer from "../Elements/FooterU";
import NewPost from "./Post/newPost";

function LayoutPost() {
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  return (
    <div>
      <div className="inicio">
        <aside className="contenedor_logo">
          <div className="logo_i">
            <span className="negritas">AquaVision</span>
          </div>
          <nav className="margen_inferior">
            <div className="entradas">
              <div className="sections-header">SECCIONES</div>
              <select className="diseñosec">
                <option value="categoria0">entradas</option>
                <option value="categoria1">todas</option>
                <option value="categoria2">añadir nueva</option>
                <option value="categoria3">categorias</option>
              </select>
              <div className="entradas">
                <div className="sectionsUS">USUARIO</div>
              </div>
              <div className="entradas">
                <button onClick={cerrarSesion} className="sesion">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </nav>
        </aside>

        <main className="todo_espacio">
          <div className="contenedor_cuadicular">
            <div className="margin">
              <div className="entrada">
                <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
              </div>
            </div>
          </div>
          <NewPost />
        </main>
      </div>
      <Footer />
    </div>
  );
}
export default LayoutPost;
