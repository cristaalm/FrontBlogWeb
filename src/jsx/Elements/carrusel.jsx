import React, { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { BaseUrl } from "../../constants/global";
import { Link, useNavigate } from "react-router-dom";

const Carrusel = () => {
  const carruselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const speed = 1; // Velocidad de desplazamiento
  const [entradas, setEntradas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let animationFrameId;

    const loop = () => {
      if (carruselRef.current && !isHovering) {
        // Obtener el ancho total del carrusel
        const carruselWidth = carruselRef.current.scrollWidth;
        // Actualizar el desplazamiento
        setScrollLeft((scrollLeft) => (scrollLeft + speed) % carruselWidth);
      }

      // Continuar el bucle
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Limpiar el bucle cuando el componente se desmonta
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering]);

  useEffect(() => {
    if (!isHovering && carruselRef.current) {
      // Detener el desplazamiento cuando el cursor está sobre el carrusel
      carruselRef.current.scrollLeft = scrollLeft;
    }
  }, [isHovering, scrollLeft]);

  // Obtiene los entradas en la tabla (POST)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + "/api/entradas/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setEntradas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleViewEntrada = (id) => {
    // alert(id);
    navigate(`/blog-post/${id}`);
    window.location.reload();
    window.location.scrollTo(0, 0);
  };

  return (
    <div
      className="Carruselimg"
      style={{ overflow: "hidden" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="carrusel1"
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${scrollLeft}px)`,
        }}
        ref={carruselRef}
      >
        {entradas &&
          entradas
            .sort(
              (a, b) =>
                new Date(b.fechapublicacion) - new Date(a.fechapublicacion)
            )
            .map((entrada) => (
              <div
                key={entrada.id}
                onClick={() => toggleViewEntrada(entrada.id)}
                className="ultimasentradas rounded-md text-cyan-950 hover:text-yellow-50 cursor-pointer lista"
                style={{
                  flex: "0 0 auto",
                  marginRight: "20px",
                  width: "20rem",
                }}
              >
                <div className="categoria-seleccionada lista">
                  <img
                    className="catimg rounded-md lista"
                    src={entrada.imgdestacada}
                    alt={"Imagen Destacada de entrada " + entrada.id}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="contenido-entrada font-medium">
                  <div className="metaentrada lista">
                    {entrada.nombre} -{" "}
                    {format(
                      new Date(entrada.fechapublicacion + "T00:00:00-06:00"),
                      "dd/MM/yyyy"
                    )}
                  </div>
                  <div className="tituloentrada lista">{entrada.titulo}</div>
                  <span
                    style={{
                      backgroundColor: entrada.color,
                      color:
                        entrada.color === "#b80000" ||
                        entrada.color === "#5300eb" ||
                        entrada.color === "#006b76" ||
                        entrada.color === "#db3e00" ||
                        entrada.color === "#008b02" ||
                        entrada.color === "#1273de" ||
                        entrada.color === "#004dcf"
                          ? "whitesmoke"
                          : "black",
                    }}
                    className="text-sm p-1 object-bottom pl-4 pr-4 rounded-full font-medium"
                  >
                    {entrada.nombrecategoria}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Carrusel;
