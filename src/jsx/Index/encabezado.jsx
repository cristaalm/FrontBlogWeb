import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Encabezado =() => {
    return (
    <header className="headerhome">
        <div className="iml">
            <img src="../../../public/img/logo.png" />
        </div>
        <div className="menum">
            <button className="navegacion" >
                <FormattedMessage id="index.Welcome" defaultMessage="Welcome " />
            </button>
            <button className="navegacion"><FormattedMessage id="index.Multimedia-Resources" defaultMessage="Multimedia Resources" /> 
            </button>
            <button className="navegacion">
                <FormattedMessage id="index.Tickets" defaultMessage="Tickets " />
            </button>
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