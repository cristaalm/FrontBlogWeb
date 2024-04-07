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