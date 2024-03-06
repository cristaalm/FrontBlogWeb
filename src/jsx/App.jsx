import React from "react";
import "./App.css"; // Asegúrate de que el path sea correcto

const AuthForm = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="primero">
      <div className="wrapper">
        <div className="title-text">
          <div className={isLogin ? "title login hide" : "title login hide"}>
            Login Form
          </div>
          <div className={!isLogin ? "title signup hide" : "title signup hide"}>
            Signup Form
          </div>
        </div>
        <div className="form-container">
          <div className="form-inner">
            <form action="#" className="login">
              <div className="field">
                <input type="text" placeholder="Username" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              {/* <div className="pass-link"><a href="#">Forgot password?</a></div> */}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <AuthForm />;
}

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
