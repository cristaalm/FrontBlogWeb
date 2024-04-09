import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Encabezado =() => {
    return (
    <header className="headerhome">
        <div className="iml">
            <img className="logo" src="../../../public/img/logo.png" />
        </div>
        <div className="menum">
            <button className="navegacion" >
                <a className="mivimiento" href="welcome">
                    <FormattedMessage id="index.Welcome" defaultMessage="Welcome " />
                </a>
            </button>
            <button className="navegacion">
                <a className="mivimiento" href="#recursos-multimedia">
                    <FormattedMessage id="index.Multimedia-Resources" defaultMessage="Recursos Multimedia" />
                </a>
            </button>
            <button className="navegacion">
                <a className="mivimiento" href="#ultima-entrada ">
                    <FormattedMessage id="index.Tickets" defaultMessage="Tickets " />
                </a>
            </button>
            <button className="navegacion">
                <a className="mivimiento" href="#quizz">
                    Quizz
                </a>
            </button>
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