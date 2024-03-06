import React, { useState } from 'react';
import { loginUser } from './js/readUsers';
import './css/App.css'; 

const AuthForm = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log('Login successful:', data);
      // Aquí puedes manejar la respuesta exitosa, por ejemplo, redirigiendo a otra página
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      setError(errorMessage); // Manejo del error
    }
  };

  return (
    <div className="primero">
      <div className="wrapper">
        <div className="title-text">
          <div className={isLogin ? "title login" : "title login hide"}>
            Login Form
          </div>
          <div className={!isLogin ? "title signup" : "title signup hide"}>
            Signup Form
          </div>
        </div>
        <div className="form-container">
          <div className="form-inner">
            <form onSubmit={handleSubmit} className="login">
              <div className="field">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="error">{error}</div>} {/* Renderizado del error */}              <div className="field btn">
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
