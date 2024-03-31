const Inicio =() => {
    return (
        <main className="todo_espacio">
        <div className="contenedor_cuadicular">
          <div className="margin">
            <div className="entrada">
              <h1 className="tamaño_fuente">Hola Admin </h1>
              {/* <div className="entradaChil">
                <img
                  src="/public/img/logo without bg.png"
                  width="50px;"
                  alt="Imagen del Usuario"
                />
                <span className="hello">¡Hola, Admin!</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="todo_espacio3">

          <div className="left">
            {/* <div className="margen_boton">
              <div className="ancho" htmlFor="title">
                Nombre De La Categoria 
              </div>
              <textarea className="cuadro_txt" placeholder="Ingresa Tituo"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="description">
                Descripción
              </div>
              <textarea className="cuadro_txt" placeholder="Ingresa Descripcion"></textarea>
            </div>
            <div className="margen_boton">
              <button type="button" className="dest" onClick={handleToggleModal}>
                Imagen Destacada
              </button>
              {showModal && (
          <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p className="apartadop">Inserta el enlace de la imagen:</p>
            <input className="insertor"
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <p className="apartadop">Inserta el ancho de la imagen (en píxeles):</p>
            <input className="insertor"
              type="number"
              value={imageWidth}
              onChange={(e) => setImageWidth(e.target.value)}
            />
            <p className="apartadop">Inserta el alto de la imagen (en píxeles):</p>
            <input className="insertor"
              type="number"
              value={imageHeight}
              onChange={(e) => setImageHeight(e.target.value)}
            />
            <button className="insert-button" onClick={handleAddImage}>
              Insertar
            </button>
          </div>
        </div>
          )}

            </div>
            <div>
              <button type="submit" className="entr">
                Añadir Categoria
              </button>
            </div> */}
          </div>
          {/* <div className="right">
            <div className="bg-white p-6">
              <div className="flex flex-col space-y-4">
              <div className="overflow-x-auto">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="header">
                      <tr className="tr-header">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Color</th>
                        <th>-----</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tr-body">
                        <td>1</td>
                        <td>lorem ipssum</td>
                        <td>red</td>
                        <td>
                          <button className="btn-green mr-2">Editar</button>
                          <button className="btn-red mr-2">Eliminar</button>
                        </td>
                      </tr>
                      <tr className="tr-body">
                        <td>2</td>
                        <td>lorem ipssum</td>
                        <td>width</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    );
}

export default Inicio