import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiChevronRight, BiListUl } from 'react-icons/bi';
import { FaUser } from "react-icons/fa";

import "../../../css/sidernav.css"


const Sidebar = ({ onToggleSidebar }) => {

    
    const handleCloseMenu = () => {
        setCloseMenu(!closemenu);
        onToggleSidebar(!closemenu); // Avisa al componente padre sobre el cambio.
    };
    
    const [isClosed, setIsClosed] = useState(false);
    const [isSectionsExpanded, setIsSectionsExpanded] = useState(false); // Define este estado para controlar la expansión de las secciones
    const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false); // Define este estado para controlar la expansión del menú de usuario

    const toggleSidebar = () => setIsClosed(!isClosed);
    const toggleSections = () => setIsSectionsExpanded(!isSectionsExpanded); // Define esta función
    const toggleUserMenu = () => setIsUserMenuExpanded(!isUserMenuExpanded); // Define esta función
    
    const location =useLocation();

    const [closemenu, setCloseMenu] = useState(false)

    return (
        <div className= {closemenu === false ? "sidernav" : "sidernav active"}>
            <div className= {closemenu === false ?'logocontainer':'logocontainer active' }>
                {/* <img src="../../../../public/img/logo.png" alt="ico n" className='logotip' /> */}
                <h2 className='title'>AquaVision</h2>
            </div>
            <BiChevronRight className='iconmenugood' onClick={()=>{handleCloseMenu()}} />
            <div className={closemenu === false ?'contentscontainer':'contentscontainer active' }   >
                <ul className='listado'>
                    <li className='lista'>
                        <BiListUl className='toggle'/> 
                        <span onClick={toggleSections} className='desple' >SECCIONES</span>
                        {isSectionsExpanded && (
                            <ul className="submenu">
                                <li className="conlin">
                                    <Link to="/new-post/inicio">inicio</Link>
                                </li>
                                <li className="conlin">
                                    <Link to="/new-post/entradas">Entradas</Link>
                                </li>
                                <li className="conlin">
                                    <Link to="/new-post/todas">Todas</Link>
                                </li>
                                <li className="conlin">
                                    <Link to="/new-post/anadir-nueva">Añadir Nueva</Link>
                                </li>
                                <li className="conlin">
                                    <Link to="/new-post/categorias">Categorías</Link>
                                </li>
                            </ul>
                            )}
                    </li>
                    <li className='lista'>
                        <FaUser className='toggle'/>
                        <span onClick={toggleUserMenu} className='desple' >USUARIO</span>
                        {isUserMenuExpanded && (
                            <ul className="submenu">
                                <li className="conlin">
                                    <Link to="/new-post/usuarios">usuarios</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
            
        </div>
        
    );
};

export default Sidebar;

