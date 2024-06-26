import { CircleUser } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Link as ScrollLink } from "react-scroll";
const Encabezado2 = () => {
  return (
    <header id="header" className="headerhome">
      <div className="iml">
        <RouterLink to="/welcome">
          <img className="logo" src="/img/logo.png" />
        </RouterLink>
      </div>
      <div className="menum">
        <RouterLink to="/welcome">
          <button className="navegacion">
            <FormattedMessage id="index.Welcome" defaultMessage="Welcome " />
          </button>
        </RouterLink>
        <RouterLink to="/all-the-blogpost">
          <button className="navegacion">
            <FormattedMessage id="index.blogPost" defaultMessage="blogPost" />
          </button>
        </RouterLink>
        <RouterLink to="/quizz">
          <button className="navegacion">
            <FormattedMessage id="index.quizz" defaultMessage="Quizz " />
          </button>
        </RouterLink>
      </div>
      <div className="log">
        <RouterLink to="/login">
          <CircleUser className="CircleUser mr-1" size={35} />
        </RouterLink>
      </div>
    </header>
  );
};

export default Encabezado2;
