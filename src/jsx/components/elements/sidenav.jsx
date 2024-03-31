import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importación necesaria para usar <Link>
import { BiChevronRight,BiListUl } from 'react-icons/bi'; // Importa solo los íconos que vas a utilizar
import { FaUser } from "react-icons/fa";
const Sidebar = () => {
    const [isClosed, setIsClosed] = useState(false);
    const [isSectionsExpanded, setIsSectionsExpanded] = useState(false); // Define este estado para controlar la expansión de las secciones
    const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false); // Define este estado para controlar la expansión del menú de usuario

    const toggleSidebar = () => setIsClosed(!isClosed);
    const toggleSections = () => setIsSectionsExpanded(!isSectionsExpanded); // Define esta función
    const toggleUserMenu = () => setIsUserMenuExpanded(!isUserMenuExpanded); // Define esta función

    return (
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
                
            </div>
        </nav>
    );
};

export default Sidebar;

