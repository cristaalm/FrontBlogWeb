import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [isEntriesDropdownOpen, setIsEntriesDropdownOpen] = useState(false);

  const toggleEntriesDropdown = () => {
    setIsEntriesDropdownOpen(!isEntriesDropdownOpen);
  };

  useEffect(() => {
  
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/kovdcfjaqbeap5tn2t47qcgag4xk6qwtg473e9iu0rmn2kd2/tinymce/6/tinymce.min.js';
    script.referrerpolicy = 'origin';
    document.head.appendChild(script);

    script.onload = () => {
      window.tinymce.init({
        selector: '#entryDescription',
        // Opciones de configuración de TinyMCE
        // ...
      });
    };

    return () => {
      // Destruye el editor para evitar fugas de memoria
      window.tinymce?.remove('#entryDescription');
    };
  }, []);

  return (
    <div className="dashboard">
     
      <aside className="sidebar">
       <img src="src/img/logo without bg.png"  width="100px" height="100px"   alt="pene" />
        <div className="sections-header">SECCIONES</div>
        <div className="menu">
          <div className="menu-item" onClick={toggleEntriesDropdown}>
            Entradas {isEntriesDropdownOpen ? '-' : '+'}
          </div>
          {isEntriesDropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-item">Todas</div>
              <div className="dropdown-item">Añadir nueva</div>
              <div className="dropdown-item">Categorías</div>
            </div>
          )}
          <div className="menu-item">Usuarios</div>
        </div>
        {/* Botones y Selector de Categorías ahora se mueven aquí */}
        <div className="sidebar-actions">
          <select id="categorySelect">
            <option>Seleccione categoría...</option>
            {/* Las opciones de categoría irían aquí */}
          </select>
          <button type="button" id="previewButton">Previsualizar</button>
          <button type="button" id="addImageButton">Imagen Destacada</button>
          <button type="submit" id="saveButton">Guardar Entrada</button>
        </div>
      </aside>



      <main className="content">
        <div className="content-header">
          <h1>Añadir nueva entrada</h1>
          <div className="user-greeting">¡Hola, administrador!</div>
        </div>
        <div className="entry-form">
          <div className="form-group">
           {/* <input htmlFor="entryTitle" type="text" placeholder='Ingresa titulo'></input> */}
          </div>


          {/* El editor TinyMCE se coloca aquí */}

         {/*<div className="form-group tinymce-container">
            <label htmlFor="entryDescription">Descripción</label>
            <textarea id="entryDescription"></textarea>
          </div> */}
          
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
