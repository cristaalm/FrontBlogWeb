import React from 'react';
import './CRUD.css'; 
function CRUD() {
  return (
    <div className="bg-white p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Entradas</h1>
          <button className="btn-blue">
            Añadir nueva entrada
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="header">
                <tr className="tr-header">
                  <th>ID</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tr-body">
                  <td>1</td>
                  <td>Cat1</td>
                  <td>Informativo</td>
                  <td>
                    <button className="btn-green mr-2">Editar</button>
                    <button className="btn-yellow mr-2">Previsualizar</button>
                    <button className="btn-red mr-2">Eliminar</button>
                    <button className="btn-purple">Publicar</button>
                  </td>
                </tr>
                <tr className="tr-body">
                  <td>2</td>
                  <td>Cat2</td>
                  <td>Informativo</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUD;