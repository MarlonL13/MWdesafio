import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const TipoFalhasChart = ({ data }) => {
  const historyData = data;

  // Função para filtrar as falhas por período
  const getPieChartData = (data) => {
    const counts = {
      Ping: 0,
      Tráfego: 0,
      Potência: 0,
    };

    data.forEach((item) => {
      const tipo = item.nome.split(" ")[0]; // Pega o primeiro nome

      if (counts[tipo] !== undefined) {
        counts[tipo]++;
      }
    });

    return Object.entries(counts).map(([label, value]) => ({
      id: label,
      value,
      label,
    }));
  };

  const pieChartData = getPieChartData(historyData);

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        marginTop: 5,
        padding: 2,
        paddingBottom: 0,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Distribuição das Falhas
        </Typography>
        <Box
          sx={{
            position: "relative",
            top: 20,
            display: "flex",
            marginTop: 1,
            justifyContent: "center",
            height: 100, // altura reduzida para meio círculo
            overflow: "hidden",
          }}
        >
          <PieChart
            width={350}
            height={100} // menor altura para meio círculo
            series={[
              {
                data: pieChartData,
                innerRadius: 60,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 90,
                cx: 100,
                cy: 100,
              },
            ]}
            slotProps={{
              legend: {
                direction: "column",
                position: {
                  vertical: "right",
                  horizontal: "right",
                },
                padding: 8,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TipoFalhasChart;
