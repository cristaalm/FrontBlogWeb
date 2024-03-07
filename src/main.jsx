import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import CRUD from './Componentes/CRUD.jsx';
import Dashboard from './jsx/components/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);


