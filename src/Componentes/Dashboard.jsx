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
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
      });
    };

    return () => {
      // Destruye el editor para evitar fugas de memoria
      window.tinymce?.remove('#entryDescription');
    };
  }, []);

  return (   
     
  <div className="inicio">
      <aside className="contenedor_logo">
        <div className="logo_i">
          <span className="negritas">Logo</span>
        </div>
        <nav className="margen_inferior">
          <div className="entradas">
            <div className="sections-header">SECCIONES</div>
            <div className="menu-item" onClick={toggleEntriesDropdown}>
              <div className={`menu-item ${isEntriesDropdownOpen ? 'minus' : 'plus'}`} onClick={toggleEntriesDropdown}>
                Entradas
              </div>
            </div>
            {isEntriesDropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item">Todas</div>
                <div className="dropdown-item">Añadir nueva</div>
                <div className="dropdown-item">Categorías</div>
              </div>
             )}
            <div className="entradas">
                <span>Usuarios</span>
            </div>
          </div>
        </nav>
      </aside>
     
      <main className="todo_espacio">
        <div className="contenedor_cuadicular">
          <div className='margin' >
            <div className='entrada'>
              <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
              <span>¡Hola, Admin!</span>
            </div>
          </div>  
        </div>
        <div className='todo_espacio2'>
          <div className='left'>
            <div className="margen_boton">
              <div className="ancho" htmlFor="title">Título de Entrada</div>
              <textarea  className="cuadro_txt"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="category">Categorías</div>
              <select className="diseño">
                <option value="categoria1">Selecciona una categoria</option>
                <option value="categoria2">Categoría 1</option>
              </select>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="description">Descripción</div>
              <textarea  className="cuadro_txt"></textarea>
            </div>
            <div className="margen_boton">
              <button type="button" className="pre">Previsualizar</button>
            </div>
            <div className="margen_boton">
              <button type="button" className="btn">Imagen Destacada</button>
            </div>
            <div>
              <button type="submit" className="entr">Guardar Entrada</button>
            </div>
          </div>
          <div className='right'>
            <div className="previsualizar">
              <div className="bottonpre">
              <h2 className="negt">Previsualización</h2>
              </div>
              <div className="border">
                <div className="form-group tinymce-container">
                  <div className='enter'></div>
                  <textarea id="entryDescription"></textarea>
                </div> 
              </div>
            </div>
          </div>
        </div>
        
      </main>
      
      
    
  </div>
);
};

export default Dashboard;
