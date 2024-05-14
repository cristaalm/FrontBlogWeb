import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { BaseUrl } from "../../constants/global";
const series = [
  {
    color: "#00FF00",
    dataKey: "Excelente",
    label: "Excelente",
  },
  {
    color: "#FFFF00",
    dataKey: "Muy Bueno",
    label: "Muy Bueno",
  },
  {
    color: "#FFA500",
    dataKey: "Bueno",
    label: "Bueno",
  },
  {
    color: "#FF6347",
    dataKey: "Regular",
    label: "Regular",
  },
  {
    color: "#FF0000",
    dataKey: "Malo",
    label: "Malo",
  },
];
const chartSetting = {
  xAxis: [
    {
      label: "Valoración",
    },
  ],
  width: 500,
  height: 400,
};

export default function BarHorizontal() {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + "/api/comments/promedio", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!Array.isArray(data.data)) {
          return;
        }

        var datos = data.data;
        datos.forEach((entry) => {
          entry.promedio_valoracion = parseFloat(entry.promedio_valoracion);
        });
        datos.sort((a, b) => b.promedio_valoracion - a.promedio_valoracion);
        var i = 1;
        datos.forEach((entry) => {
          entry.orden = "# " + i;
          i++;
        });
        setComment(datos);
        // console.log(datos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!comment || comment.length === 0) {
    return <div>Loading...</div>;
  }

  // const dataset = comment.data.map((cat) => {
  //   let color, message;
  //   if (cat.promedio_valoracion >= 4.5) {
  //     color = "#00FF00"; // verde
  //     message = "Excelente";
  //   } else if (cat.promedio_valoracion >= 3.5) {
  //     color = "#FFFF00"; // amarillo
  //     message = "Muy Bueno";
  //   } else if (cat.promedio_valoracion >= 2.5) {
  //     color = "#FFA500"; // naranja
  //     message = "Bueno";
  //   } else if (cat.promedio_valoracion >= 1.5) {
  //     color = "#FF6347"; // rojo claro
  //     message = "Regular";
  //   } else {
  //     color = "#FF0000"; // rojo
  //     message = "Malo";
  //   }

  //   return {
  //     puntuación: cat.promedio_valoracion,
  //     título: cat.identrada,
  //     color,
  //     message,
  //   };
  // });

  const valueFormatter = (value) => `${value}mm`; // Define la función de formato
  return (
    <BarChart
      dataset={comment}
      yAxis={[{ scaleType: "band", dataKey: "orden" }]}
      series={[
        {
          data: comment.map((item, index) => item.promedio_valoracion),
          label: "Valoración",
          type: "bar",
          valueFormatter: (code, context) => {
            return (
              comment[context.dataIndex].titulo +
              " : " +
              comment[context.dataIndex].promedio_valoracion
            );
          },
        },
      ]}
      // series={dataset.map((item, index) => ({
      //   dataKey: "promedio_valoracion",
      //   label: "puntuacion",
      //   valueFormatter,
      //   color: item.color, // Utiliza el color de cada fila horizontal
      //   labelComponent: ({ x, y, dy, item }) => (
      //     <text
      //       x={x}
      //       y={y}
      //       dy={dy}
      //       textAnchor="middle"
      //       fill={item.color} // Utiliza el color de cada fila horizontal
      //     >
      //       {item.titulo}
      //     </text>
      //   ),
      // }))}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
