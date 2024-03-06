  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import Dashboard from './Componentes/Dashboard.jsx';
import EntriesComponent from './Componentes/CRUD.jsx';
  //import './index.css';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <EntriesComponent/>
    </React.StrictMode>,
  )
