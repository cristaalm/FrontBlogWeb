import React, { useRef, useEffect, useState } from 'react';
import '../../css/entradasvew.css'; 

const Carrusel = () => {
  const carruselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const speed = 2; // Velocidad de desplazamiento

  useEffect(() => {
    let animationFrameId;

    const loop = () => {
      if (carruselRef.current && !isHovering) {
        // Actualizar el desplazamiento
        setScrollLeft(scrollLeft => (scrollLeft + speed) % (carruselRef.current.scrollWidth / 2));
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

  return (
    <div 
      className="Carruselimg" 
      ref={carruselRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Duplicar los carruseles para crear un bucle */}
      <div className="carrusel1">
        <div className="imagendes">
          <div className="numero bg-yellow-400 font-semibold">#1</div>
          <img className="imgdest rounded-md" src="../../../public/img/img3.png" alt="Carrusel 1"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel2">
        <div className="imagendes">
          <div className="numero bg-pink-400 font-semibold">#2</div>
          <img className="imgdest rounded-md" src="../../../public/img/img4.png" alt="Carrusel 2"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-pink-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel3">
        <div className="imagendes">
          <div className="numero bg-lime-400 font-semibold">#3</div>
          <img className="imgdest rounded-md" src="../../../public/img/img5.png" alt="Carrusel 3"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-lime-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel4">
        <div className="imagendes">
          <div className="numero bg-blue-400 font-semibold">#4</div>
          <img className="imgdest rounded-md" src="../../../public/img/img6.png" alt="Carrusel 4"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Repetir los carruseles para crear un bucle */}
      <div className="carrusel1">
        <div className="imagendes">
          <div className="numero bg-yellow-400 font-semibold">#1</div>
          <img className="imgdest rounded-md" src="../../../public/img/img3.png" alt="Carrusel 1"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel2">
        <div className="imagendes">
          <div className="numero bg-pink-400 font-semibold">#2</div>
          <img className="imgdest rounded-md" src="../../../public/img/img4.png" alt="Carrusel 2"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-pink-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel3">
        <div className="imagendes">
          <div className="numero bg-lime-400 font-semibold">#3</div>
          <img className="imgdest rounded-md" src="../../../public/img/img5.png" alt="Carrusel 3"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-lime-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel4">
        <div className="imagendes">
          <div className="numero bg-blue-400 font-semibold">#4</div>
          <img className="imgdest rounded-md" src="../../../public/img/img6.png" alt="Carrusel 4"/>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-400 rounded-full mr-4"></div>
          <div className="categorias flex flex-col leading-tight">
            <div>
              <span className="mr-2 font-semibold">Categoría</span>
            </div>
            <div>
              <span className="text-zinc-500 text-sm"># Entradas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrusel;
