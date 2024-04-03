import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { BiChevronRight, BiListUl } from 'react-icons/bi';
import { FaUser } from "react-icons/fa";
import "../../css/sidernav.css"

const Sidebar = ({ onToggleSidebar }) => {
    const navigate = useNavigate(); // Inicializa useNavigate aquí
    const [closeMenu, setCloseMenu] = useState(false);
    const [isSectionsExpanded, setIsSectionsExpanded] = useState(false);
    const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false);

    const toggleSections = () => setIsSectionsExpanded(!isSectionsExpanded);
    const toggleUserMenu = () => setIsUserMenuExpanded(!isUserMenuExpanded);
    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
        if (onToggleSidebar) {
            onToggleSidebar(!closeMenu); // Avisa al componente padre sobre el cambio si es necesario
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "false") {
            navigate("/login");
        }
    }, [navigate]); // Añade navigate a la lista de dependencias del useEffect

    return (
        <div className={closeMenu ? "sidernav active" : "sidernav"}>
            <div className={closeMenu ? 'logocontainer active' : 'logocontainer'}>
                <h2 className='title'>AquaVision</h2>
            </div>
            <BiChevronRight className='iconmenugood' onClick={handleCloseMenu} />
            <div className={closeMenu ? 'contentscontainer active' : 'contentscontainer'}>
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
            <div className="entradas">
                <button onClick={cerrarSesion} className="sesion">Cerrar sesión</button>
            </div>
        </div>
    );
};

export default Sidebar;

