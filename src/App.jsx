import { useState, useEffect } from "react";
// import { loginUser } from "./js/readUsers";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    console.log(storedAuth);
    if (storedAuth == null) {
      localStorage.setItem("isAuthenticated", "false");
    }
    if (storedAuth == "true") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="App"></div>;
};

export default App;
{
  /* <div className='mine'>
      <div className='contenedor'>
        
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
        <div className="inicio">
          <h2 class="borderp">AquaVision</h2>
          <h2 class="wa">AquaVision</h2>
        </div>
        <a href="#" className="login-link">
          <span>inicio</span>
          <div className="muv"></div>
        </a>
           
    </div>
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">Login Form</div>
          <div className="title signup">Signup Form</div>
      </div>
    </div>
      
    </div> */
}
