import { useState, useEffect } from "react";
import { loginUser } from "../../js/readUsers";
import "../../css/AuthForm.css";
import "../../js/AuthForm.js";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    window.onload();
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      localStorage.setItem("isAuthenticated", "false");
      storedAuth = "false";
    }
    if (storedAuth == "true") {
      navigate("/dashboard");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log(data);
      localStorage.setItem("isAuthenticated", data.logged);
      if (data.logged) {
        setTimeout(function () {
          navigate("/dashboard");
        }, 1000);
      }
      // onLogin(username, password); // Call the onLogin function from the parent component
    } catch (error) {
      console.error("Login failed:", error);
      localStorage.setItem("isAuthenticated", false);
    }
  };

  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="container">
        <img src="../../../public/img/logo.png" alt="" />
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Usuario</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Contraseña</label>
          </div>
          <button type="submit" className="btn">
            Ingresar
          </button>
        </form>
      </div>
    </section>
    // <div className="primero">
    //   <div className="wrapper">
    //     <div className="title-text">
    //       <div className="title login">Login Form</div>
    //     </div>
    //     <div className="form-container">
    //       <div className="form-inner">
    //         <form onSubmit={handleSubmit} className="login">
    //           <div className="field">
    //             <input
    //               type="text"
    //               placeholder="Username"
    //               required
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //             />
    //           </div>
    //           <div className="field">
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               required
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //           </div>
    //           {error && <div className="error">{error}</div>}
    //           <Button type="submit" variant="primary">
    //             Primary
    //           </Button>

    //           <div className="field btn">
    //             <div className="btn-layer"></div>
    //             <input type="submit" value="Login" />
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AuthForm;
