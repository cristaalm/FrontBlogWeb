import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import CRUD from './Componentes/CRUD.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
