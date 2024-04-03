import { useState, useEffect } from "react";
import { createPost } from "../../js/createPost";
import "../../css/Dashboard.css";
import "../../css/App.css";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiUser } from "react-icons/ci";
import { Container, Row, Col } from 'react-bootstrap';
import { CiCloudOn } from "react-icons/ci";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Sidebar from "../Elements/SideNavBar";
import { BiChevronRight,BiListUl } from 'react-icons/bi'; // Importa solo los íconos que vas a utilizar
import { FaUser } from "react-icons/fa";

function newPost() {
  
  
  const navigate = useNavigate(); // Obtiene la función de navegación

  const [isEntriesDropdownOpen, setIsEntriesDropdownOpen] = useState(false);

  
  const handleSelectionChange = (e) => {
    navigate(e.target.value);
  };
  // const [showModal, setShowModal] = useState(false);
  // const [imageLink, setImageLink] = useState("");
  // const [imageWidth, setImageWidth] = useState("");
  // const [imageHeight, setImageHeight] = useState("");
  // const handleAddImage = () => {
  //   // Lógica para insertar la imagen en el editor de texto
  //   console.log("Link de la imagen:", imageLink);
  //   console.log("Ancho de la imagen:", imageWidth);
  //   console.log("Alto de la imagen:", imageHeight);
  //   // Aquí puedes realizar la lógica para insertar la imagen en el editor de texto si es necesario
  //   setShowModal(false); // Cierra el modal después de procesar la imagen
  // };
  // const handleToggleModal = () => {
  //   setShowModal(!showModal);
  // };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Aquí puedes hacer una solicitud a tu API para obtener las categorías
    // Supongamos que la respuesta de la API es un array de objetos con propiedades 'id' y 'name'
    const fetchData = async () => {
      const response = await fetch(
        "https://backblogweb.onrender.com/api/categories"
      );
      const data = await response.json();
      setCategories(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const toggleEntriesDropdown = () => {
    setIsEntriesDropdownOpen(!isEntriesDropdownOpen);
  };
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  

  useEffect(() => {
    let storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth == null) {
      localStorage.setItem("isAuthenticated", "false");
      storedAuth = "false";
    }
    console.log("stored", storedAuth);
    if (storedAuth == "false") {
      navigate("/login");
    }
  }, []);
  const logOff = async () => {
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      localStorage.removeItem("isAuthenticated");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(titulo, contenido, idcategoria, img, usuario);
      // console.log(id);
      if (password === passwordConfirm) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setMessage("New password saved correctly.");
        setMessageClass("success");
      } else {
        setMessage("Passwords do not match");
        setMessageClass("error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("An error occurred while resetting the password");
      setMessageClass("error");
    }
  };
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);

  const toggleHome = () => {
    setIsHomeExpanded(!isHomeExpanded);
  };
  const [sidebarIsActive, setSidebarIsActive] = useState(false);


  const [isIconOnly, setIsIconOnly] = useState(false);

  const toggleIconOnly = () => {
    setIsIconOnly(!isIconOnly);
  };

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };



  const toggleSections = () => setIsSectionsExpanded(!isSectionsExpanded); // Define esta función
  const toggleUserMenu = () => setIsUserMenuExpanded(!isUserMenuExpanded); // Define esta función   

const [isClosed, setIsClosed] = useState(false);



  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  


  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
};

  return (
    <div>
      {/* <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
        chin
      </a> */}
      <div className="inicio">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleSidebar={setIsSidebarCollapsed} />
      <main className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Outlet />
      </main>
      </div> 
      {/*<Footer />*/} 
    </div>
  );
}

export default newPost;
