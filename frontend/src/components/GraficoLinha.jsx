import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { prepareChartData } from "../utils/dataProcessing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const GraficoLinha = ({ data, title }) => {
  const { allDays, chartSeries } = prepareChartData(data);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's mobile

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        height: "100%", // Ensures the card takes the full height of the grid item
        display: "flex", // Ensures proper alignment of content
        flexDirection: "column", // Aligns content vertically
        justifyContent: "space-between", // Ensures proper spacing
        color: "text.primary",
        borderRadius: 2,
        padding: 2,
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
          series={chartSeries}
          height={300}
          margin={{
            top: isMobile ? 100 : 50, // Increases top margin on mobile
            bottom: 20, // Increases bottom margin
            left: 20,
            right: 35,
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
