import React from 'react';
import './indexadmin.css';

function IndexAdmin() {

  const Sidebar = () => {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>Logo</h3>
        </div>
        <nav className="sidebar-nav">
          <p>SECCIONES</p>
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <button className="sidebar-button">Entradas</button>
            </li>
            <li className="sidebar-item">
              <button className="sidebar-button">Usuarios</button>
            </li>
          </ul>
        </nav>
      </aside>
    );
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <h1>Panel de Administración</h1>
          <span>¡Hola, Admin!</span>
        </header>
        <section className="panel-content">
          {/* Aquí va el contenido principal del panel de administración */}
        </section>
      </main>
    </div>
  );
}

export default IndexAdmin;