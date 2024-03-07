import React, { useState, useEffect } from "react";
import { loginUser } from "./js/readUsers";
import "./css/App.css";
import Dashboard from "./jsx/components/Dashboard";
import ReactDOM from "react-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="App">
      {isAuthenticated ? <Dashboard /> : <AuthForm setIsAuthenticated={setIsAuthenticated}/>}
    </div>
  );
};

const AuthForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      setIsAuthenticated(data.logged);
      localStorage.setItem("isAuthenticated", data.logged); 
      // onLogin(username, password); // Call the onLogin function from the parent component
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred"); // Set the error message
      setIsAuthenticated(false); // Set the authentication state to false in case of failure
      localStorage.setItem("isAuthenticated", false);
    }
  };

  return (
    <div className="primero">
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">Login Form</div>
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
              {error && <div className="error">{error}</div>}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit"  value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
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
