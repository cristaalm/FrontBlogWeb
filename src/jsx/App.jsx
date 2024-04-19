import { useState, useEffect, useLayoutEffect } from "react";
// import { loginUser } from "./js/readUsers";
import { BaseUrl } from "../constants/global";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    // console.log(nombreusuario);
    // Mandar el nombre de usuario del fetch en el request body
    const fetchData = async () => {
      const response = await fetch(BaseUrl + "/api/users/find-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreusuario }),
      });
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);
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
