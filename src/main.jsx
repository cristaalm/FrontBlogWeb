  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import Dashboard from './jsx/components/Dashboard.jsx';
  //import './index.css';
import CRUD from './Componentes/CRUD.jsx';
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Dashboard/>
    </React.StrictMode>,
  )
