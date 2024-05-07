import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BaseUrl } from "../../constants/global";

export default function Pie() {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BaseUrl + "/api/categories/text", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCategoria(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!categoria || categoria.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = categoria.data.map((cat) => ({
    id: cat.id,
    value: cat.entradas,
    label: cat.nombre,
    color:cat.color
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
}
