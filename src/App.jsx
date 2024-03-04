import React from 'react';
import './App.css'; // Asegúrate de que el path sea correcto

const AuthForm = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className='primero'>
      <div className='reten'>

      
        <div className="wrapper"> 
          <div className="title-text">
            <div className={isLogin ? "title login" : "title login hide"}>Login Form</div>
            <div className={!isLogin ? "title signup" : "title signup hide"}>Signup Form</div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" checked={isLogin} onChange={toggleForm} />
              <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={toggleForm} />
              <label htmlFor="login" className="slide login">Login</label>
              <label htmlFor="signup" className="slide signup">Signup</label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              {isLogin ? (
                <form action="#" className="login">
                  <div className="field">
                    <input type="email" placeholder="Email Address" required/>
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" required/>
                  </div>
                  <div className="pass-link"><a href="#">Forgot password?</a></div>
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Login"/>
                  </div>
                  <div className="signup-link">Not a member? <a href="#" onClick={(e) => {e.preventDefault(); toggleForm();}}>Signup now</a></div>
                </form>
              ) : (
                <form action="#" className="signup">
                  <div className="field">
                    <input type="text" placeholder="Email Address" required/>
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" required/>
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Confirm password" required/>
                  </div>
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Signup"/>
                  </div>
                </form>
              )}
            </div>
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




{/* <div className='mine'>
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
      
    </div> */}