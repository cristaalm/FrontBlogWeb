const Usuario =() => {
    return (
        <main className="todo_espacio">
        <div className="contenedor_cuadicular">
          <div className="margin">
            <div className="entrada">
              <h1 className="tamaño_fuente">Usuarios</h1>
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
        <div className="todo_espacio2">

          <div className="left">
            <div className="margen_boton">
              <div className="ancho" htmlFor="title">
                Nombre del usuario
              </div>
              <textarea className="cuadro_txt"  placeholder="Ingrese usuario"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="title">
                Nombre completo
              </div>
              <textarea className="cuadro_txt"  placeholder="Ingrese completo"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="title">
                Correo Electrónico
              </div>
              <textarea className="cuadro_txt"  placeholder="Ingrese correo electrónico"></textarea>
            </div>
            <div className="margen_boton">
              <div className="ancho" htmlFor="description">
                Contraseña
              </div>
              <input className="cuadro_txt" type="password" id="contraseña" placeholder="Ingresa tu contraseña"/>
            </div>
            <div className="margen_boton">
              <select className="diseño">
                <option value="categoria1">Perfil</option>
                <option value="categoria2">Categoría 2</option>
              </select>
            </div>
            <div>
              <button type="submit" className="entr">
                Añadir usuario
              </button>
            </div>
          </div>
          <div className="right">
            <div className="bg-white p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Entradas</h1>
                </div>
                <div className="overflow-x-auto">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="header">
                        <tr className="tr-header">
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Perfil</th>
                          <th>Entradas</th>
                          <th>-----</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr-body">
                          <td>1</td>
                          <td>Cat1</td>
                          <td>Informativo</td>
                          <td>
                            <td>1</td>
                          </td>
                          <td>
                            <button className="btn-green mr-2">Editar</button>
                            <button className="btn-yellow mr-2">D</button>
                          </td>
                        </tr>
                        <tr className="tr-body">
                          <td>2</td>
                          <td>Cat2</td>
                          <td>Informativo</td>
                          <td className="sep">
                          <td>6</td>
                          </td>
                          <td>
                            <button className="btn-green mr-2">Editar</button>
                            <button className="btn-yellow mr-2">D</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default Usuario