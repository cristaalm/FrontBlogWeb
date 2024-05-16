import { useState, useEffect, useLayoutEffect } from "react";
// import { loginUser } from "./js/readUsers";
import { BaseUrl } from "../constants/global";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();
  
  useEffect(() => {
  const storedAuth = localStorage.getItem("isAuthenticated");
  let nombreusuario = localStorage.getItem("userName");
  
  if (storedAuth === null) {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
    return;
  }

  if (storedAuth === "true") {
    navigate("/dashboard");
  } else {
    navigate("/login");
  }

  const fetchData = async () => {
    try {
      const response = await fetch(BaseUrl + "/api/users/find-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreusuario }),
      });

      if (response.status === 404) {
        navigate("/error");
      } else {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/error"); // Navigate to error page on fetch failure
    }
  };

  fetchData();
}, [navigate, setUser]);


  return <div className="App"></div>;
};

export default App;
