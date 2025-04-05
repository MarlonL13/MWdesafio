import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { prepareChartData } from "../utils/dataProcessing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const GraficoLinha = ({ data, title }) => {
  const { allDays, chartSeries } = prepareChartData(data);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md")); // Detect if it's mobile

  const lineColors = [
    '#00FFFF', // Neon Cyan
    '#FF00FF', // Neon Magenta
    '#00FF00', // Neon Green
    '#FFFF00', // Neon Yellow
    '#FF1493', // Neon Pink
    '#1E90FF', // Neon Blue
  ];

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        height: "100%", // Ensures the card takes the full height of the grid item
        display: "flex", // Ensures proper alignment of content
        flexDirection: "column", // Aligns content vertically
         // Ensures proper spacing
          color: "text.primary",
          borderRadius: 2,
          padding: 1,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {title}
          </Typography>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: allDays,
                label: "Data",
              },
            ]}
            series={chartSeries.map((series, index) => ({
              ...series,
              curve: "monotoneX",
              color: lineColors[index % lineColors.length]
            }))}
            height={300}
            margin={{
              top: isMd ? 100 : 50, // Increases top margin on mobile
            bottom: 20, // Increases bottom margin
            left: isMd ? 30 : 25,
            right: isMd ? 10 : 35,
          }}
          grid={{ vertical: false, horizontal: true }}
          slotProps={{
            legend: {
              position: { vertical: "top", horizontal: "right" },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default GraficoLinha;
