import React, { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { BaseUrl } from "../../constants/global";
import { useNavigate } from "react-router-dom";

const Carrusel = () => {
  const carruselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const speed = 6; // Ajusta la velocidad según necesites
  const [entradas, setEntradas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/entradas/publish`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setEntradas([...data, ...data]); // Duplica las entradas para el efecto de bucle infinito
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let animationFrameId;

    const loop = () => {
      if (carruselRef.current && !isHovering) {
        const { scrollWidth, clientWidth } = carruselRef.current;
        // Calcular la longitud total del conjunto de tarjetas originales
        const singleSetWidth = (entradas.length / 2) * (25 * 16 + 20); // 25rem convertido a px y 20px de margen
        const newScrollLeft = (scrollLeft + speed) % singleSetWidth;

        setScrollLeft(newScrollLeft);
        carruselRef.current.scrollLeft = newScrollLeft;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering, scrollLeft, entradas.length]);

  const toggleViewEntrada = (id) => {
    navigate(`/blog-post/${id}`);
    window.location.reload();
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
          transform: `translateX(-${scrollLeft}px)`,
        }}
        ref={carruselRef}
      >
        {entradas.map((entrada, index) => (
          <div
            key={index}
            onClick={() => toggleViewEntrada(entrada.id)}
            className="ultimasentradas rounded-md text-cyan-950 hover:text-yellow-50 cursor-pointer"
            style={{
              flex: "0 0 auto",
              marginRight: "20px",
              width: "25rem",
            }}
          >
            <img
              className="catimg rounded-md"
              src={entrada.imgdestacada}
              alt={`Imagen Destacada de entrada ${entrada.id}`}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div className="contenido-entrada font-medium">
              <div className="metaentrada">
                {entrada.nombre} - {format(new Date(entrada.fechapublicacion), "dd/MM/yyyy")}
              </div>
              <div className="tituloentrada">{entrada.titulo}</div>
              <span
                style={{
                  backgroundColor: entrada.color,
                  color: calcularContraste(entrada.color),
                }}
                className="text-sm p-1 pl-4 pr-4 rounded-full font-medium"
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
