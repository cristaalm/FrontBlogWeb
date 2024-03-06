  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import Dashboard from './Componentes/Dashboard.jsx';
  //import './index.css';
  import CRUDD from './Componentes/CRUD.jsx';
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <CRUD/>
    </React.StrictMode>,
  )
