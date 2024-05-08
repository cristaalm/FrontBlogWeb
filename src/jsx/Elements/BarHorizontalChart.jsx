import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { BaseUrl } from "../../constants/global";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
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
        setComment(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!comment || comment.length === 0) {
    return <div>Loading...</div>;
  }

  const dataset = comment.data.map((cat) => {
    let color, message;
    if (cat.promedio_valoracion >= 4.5) {
      color = "#00FF00"; // verde
      message = "Excelente";
    } else if (cat.promedio_valoracion >= 3.5) {
      color = "#FFFF00"; // amarillo
      message = "Muy Bueno";
    } else if (cat.promedio_valoracion >= 2.5) {
      color = "#FFA500"; // naranja
      message = "Bueno";
    } else if (cat.promedio_valoracion >= 1.5) {
      color = "#FF6347"; // rojo claro
      message = "Regular";
    } else {
      color = "#FF0000"; // rojo
      message = "Malo";
    }

    return {
      puntuación: cat.promedio_valoracion,
      título: cat.identrada,
      color,
      message,
    };
  });

  const valueFormatter = (value) => `${value}mm`; // Define la función de formato
  console.log(dataset.map((item) => item.color));
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "título" }]}
      series={dataset.map((item) => ({
        dataKey: "puntuación",
        label: "puntuación ",
        valueFormatter,
        color: item.color, // Usa el color asignado en su posición en el dataset
        labelComponent: ({ x, y, dy, item }) => (
          <text
            x={x}
            y={y}
            dy={dy} // Ajustar la posición del texto dentro de la barra
            textAnchor="middle"
            color={item.color} // Utiliza el color de la barra para el texto
          >
            {item.message}
          </text>
        ),
      }))}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
