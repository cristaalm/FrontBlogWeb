import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const Encabezado =() => {
    return (
    <header className="headerhome">
        <div className="iml">
            <img src="../../../public/img/logo.png" />
        </div>
        <div className="menum">
            <button className="navegacion">Bienvenida</button>
            <button className="navegacion">Recursos Multimedia</button>
            <button className="navegacion">Entradas</button>
            <button className="navegacion">Quizz</button>
        </div>
        <div className="log">
            <Link to="/login">
            <CircleUser className="CircleUser" size={35}/>
            </Link>
        </div>
    </header>
    );
}

export default Encabezado