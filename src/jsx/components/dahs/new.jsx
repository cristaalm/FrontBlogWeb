
const NuevaEntrada =() => {
    return (
    <main className="todo_espacio">
        <div className="contenedor_cuadicular">
            <div className="margin">
                <div className="entrada">
                    <h1 className="tamaño_fuente">Añadir nueva entrada</h1>
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
                    Título de Entrada
                    </div>
                    <textarea className="cuadro_txt"></textarea>
                </div>
                <div className="margen_boton">
                    <div className="ancho" htmlFor="category">
                    Categorías
                    </div>
                    <select className="diseño">
                    <option >Seleccione su categoría...</option>
                    {/* {categories.data &&
                        categories.data.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.nombre}
                        </option>
                        ))} */}
                    </select>
                </div>
                <div className="margen_boton">
                    <div className="ancho" htmlFor="description">
                    Descripción
                    </div>
                    <textarea className="cuadro_txt"></textarea>
                </div>
                <div className="margen_boton">
                    <button
                    type="button"
                    className="pre"
                    onClick={() => window.open("/preview-post", "_blank")}
                    >
                    Previsualizar
                    </button>
                    <div className="liquid"></div>
                </div>
                <div className="margen_boton">
                    <button type="button" className="pre">
                    Imagen Destacada
                    </button>
                    <div className="liquid"></div>
                </div>
                <div>
                    <button type="submit" className="entr">
                    Guardar Entrada
                    </button>
                </div>
            </div>
            <div className="right">
                <div className="previsualizar">
                    <div className="bottonpre">
                        <h2 className="negt">Previsualización</h2>
                    </div>
                    <div className="border">
                        <div className="form-group tinymce-container">
                            <div className="enter"></div>
                            <textarea id="entryDescription"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </main>
    );
}

export default NuevaEntrada;