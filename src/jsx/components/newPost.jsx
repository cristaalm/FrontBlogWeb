import { useState, useEffect } from "react";
import { createPost } from "../../js/createPost";
import "../../css/Dashboard.css";
import "../../css/App.css";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "./elements/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiUser } from "react-icons/ci";
import { Container, Row, Col } from 'react-bootstrap';
import { CiCloudOn } from "react-icons/ci";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Sidebar from "./elements/sidenav";
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
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.tiny.cloud/1/kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2/tinymce/6/tinymce.min.js";
    script.referrerpolicy = "origin";
    document.head.appendChild(script);

    script.onload = () => {
      window.tinymce.init({
        selector: "#entryDescription",
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | bold italic underline strikethrough | link image media table | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
      });
    };

    return () => {
      // Destruye el editor para evitar fugas de memoria
      window.tinymce?.remove("#entryDescription");
    };
  }, []);

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

  const [isClosed, setIsClosed] = useState(false);
  const [isSectionsExpanded, setIsSectionsExpanded] = useState(false); // Define este estado para controlar la expansión de las secciones
  const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false); // Define este estado para controlar la expansión del menú de usuario

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
    setSidebarIsActive(!sidebarIsActive);
  };
  const toggleSections = () => setIsSectionsExpanded(!isSectionsExpanded); // Define esta función
  const toggleUserMenu = () => setIsUserMenuExpanded(!isUserMenuExpanded); // Define esta función
  
  
  return (
    <div>
      {/* <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
        chin
      </a> */}

      <div className="inicio">
      <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
            <header>
                <div className="image-text">
                    <span className="image">
                        <img  /> 
                    </span>
                    <div className="text logo-text">
                        <span className="name">AquaVision</span>
                    </div>
                </div>
                <BiChevronRight className='toggle' onClick={toggleSidebar} />
            </header>

            <div className="menu-bar">
                <div className="menu">
                <ul>
            
                <li className="sections-header">
                    <a href="#">
                        <i class='bx bx-home-alt icon' > <BiListUl /></i>
                         <span onClick={toggleSections} className="menu-link">
                            SECCIONES
                         </span>
                     </a>

                {isSectionsExpanded && (
                    <ul className="subenu">
                        <li><Link to="/new-post/inicio">inicio</Link></li>
                        <li><Link to="/new-post/entradas">Entradas</Link></li>
                        <li><Link to="/new-post/todas">Todas</Link></li>
                        <li><Link to="/new-post/anadir-nueva">Añadir Nueva</Link></li>
                        <li><Link to="/new-post/categorias">Categorías</Link></li>
                    </ul>
                )}
                </li>
                <li className="sections-header">
     <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
            <header>
                <div className="image-text">
                    <span className="image">
                        <img  /> 
                    </span>
                    <div className="text logo-text">
                        <span className="name">AquaVision</span>
                    </div>
                </div>
                <BiChevronRight className='toggle' onClick={toggleSidebar} />
            </header>

            <div className="menu-bar">
                <div className="menu">
                <ul>
            
                <li className="sections-header">
                    <a href="#">
                        <i class='bx bx-home-alt icon' > <BiListUl /></i>
                         <span onClick={toggleSections} className="menu-link">
                            SECCIONES
                         </span>
                     </a>

                {isSectionsExpanded && (
                    <ul className="subenu">
                        <li><Link to="/new-post/inicio">inicio</Link></li>
                        <li><Link to="/new-post/entradas">Entradas</Link></li>
                        <li><Link to="/new-post/todas">Todas</Link></li>
                        <li><Link to="/new-post/anadir-nueva">Añadir Nueva</Link></li>
                        <li><Link to="/new-post/categorias">Categorías</Link></li>
                    </ul>
                )}
                </li>
                <li className="sections-header">
                    <a href="#">
                        <i class='bx bx-home-alt icon' ><FaUser /></i>
                        <span onClick={toggleUserMenu} className="menu-link">
                            USUARIO
                        </span>
                    </a>
                    
                    {isUserMenuExpanded && (
                        <ul className="submenu">
                        <li>
                            <Link to="/new-post/usuarios">usuarios</Link>
                        </li>
                        </ul>
                    )}
                </li>
                </ul>  
                </div>
                              <div className="entradas">
                <button onClick={cerrarSesion} className="sesion">
                  Cerrar sesión
                </button>
              </div>
            </div>
        </nav>
                    
                    {isUserMenuExpanded && (
                        <ul className="submenu">
                        <li>
                            <Link to="/new-post/usuarios">usuarios</Link>
                        </li>
                        </ul>
                    )}
                </li>
                </ul>  
                </div>
                              <div className="entradas">
                <button onClick={cerrarSesion} className="sesion">
                  Cerrar sesión
                </button>
              </div>
            </div>
        </nav>
        {/* <Sidebar /> */}
        {/* <aside id="sidebar" className={`${sidebarIsActive ? "active" : ""} `}>
          <div className="logo_i">
            <div className="icon">
            
            </div> 
          
            <span className="negritas">
            <GiHamburgerMenu className="burger" onClick={toggleSidebar} />
              AquaVision
              </span>
            
          </div>
          <nav className="margen_inferior">
            <div className="entradas">
            <div className="entradas">

            <ul>
            
            <li className="sections-header">
              <span onClick={toggleSections} className="menu-link">
                SECCIONES
              </span>
              {isSectionsExpanded && (
                <ul className="submenu">
                      <li><Link to="/new-post/inicio">inicio</Link></li>
                      <li><Link to="/new-post/entradas">Entradas</Link></li>
                      <li><Link to="/new-post/todas">Todas</Link></li>
                      <li><Link to="/new-post/anadir-nueva">Añadir Nueva</Link></li>
                      <li><Link to="/new-post/categorias">Categorías</Link></li>
                </ul>
              )}
            </li>
            <li className="sections-header">
              <span onClick={toggleUserMenu} className="menu-link">
                USUARIO
              </span>
              {isUserMenuExpanded && (
                <ul className="submenu">
                  <li>
                    <Link to="/new-post/usuarios">usuarios</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>        
              </div>
              <div className="entradas">
                <button onClick={cerrarSesion} className="sesion">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </nav>
        </aside> */}
        <main id="main-content" className={isClosed ? "" : "expanded"}>
  
         <Outlet /> 
        </main>


        
      </div>
     {/*<Footer />*/} 
    </div>
  );
}

export default newPost;
