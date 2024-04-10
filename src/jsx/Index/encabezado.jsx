import { CircleUser } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Link as ScrollLink } from 'react-scroll';
const Encabezado =() => {
    return (
    <header id="header" className="headerhome">
        <div className="iml">
            <img className="logo" src="../../../public/img/logo.png" />
        </div>
        <div className="menum">
            
            <ScrollLink className="mivimiento" to="welcome" smooth={true} duration={500}>
                <button className="navegacion" >
                    <FormattedMessage id="index.Welcome" defaultMessage="Welcome " />
                </button>
            </ScrollLink>    
            <ScrollLink className="mivimiento" to="recursos-multimedia" smooth={true} duration={500}>
                <button className="navegacion">
                    <FormattedMessage id="index.Multimedia-Resources" defaultMessage="Recursos Multimedia" />
                </button>
            </ScrollLink>    
            <ScrollLink className="mivimiento" to="ultima-entrada" smooth={true} duration={500}>
                <button className="navegacion">
                    <FormattedMessage id="index.Tickets" defaultMessage="Tickets " />
                </button>
            </ScrollLink>    
            <ScrollLink className="mivimiento" to="quizz" smooth={true} duration={500}>
                <button className="navegacion">
                    Quizz
                </button>
            </ScrollLink>
            
        </div>
        <div className="log">
            <RouterLink to="/login">
            <CircleUser className="CircleUser" size={35}/>
            </RouterLink>
        </div>
    </header>
    );
}

export default Encabezado