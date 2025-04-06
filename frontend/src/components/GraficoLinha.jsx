import { useState, useId } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { prepareChartData } from "../utils/dataProcessing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const GraficoLinha = ({ data, title }) => {
  const { allDays, chartSeries } = prepareChartData(data);
  const [selectedSeries, setSelectedSeries] = useState("all");

  const id = useId();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const lineColors = [
    "#00d0d0", // Suave Cyan
    "#e040e0", // Suave Magenta
    "#38e038", // Suave Green
    "#e0e038", // Suave Yellow
    "#e055a3", // Suave Pink
    "#3a80ff", // Suave Blue
  ];

  // Filtrar as séries baseado na seleção
  const filteredSeries =
    selectedSeries === "all"
      ? chartSeries
      : chartSeries.filter((series) => series.label === selectedSeries);

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "text.primary",
        borderRadius: 2,
        padding: 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel
              htmlFor={`filter-series-input-${id}`}
              id={`filter-series-label-${id}`}
            >
              Filtrar
            </InputLabel>
            <Select
              inputProps={{
                id: `filter-series-input-${id}`,
                name: `filter-series-${id}`,
                "aria-labelledby": `filter-series-label-${id}`,
              }}
              labelId={`filter-series-label-${id}`}
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              label="Filtrar"
            >
              <MenuItem value="all">Todos</MenuItem>
              {chartSeries.map((series) => (
                <MenuItem key={series.label} value={series.label}>
                  {series.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: allDays,
              label: "Data",
            },
          ]}
          series={filteredSeries.map((series, index) => ({
            ...series,
            curve: "monotoneX",
            color: lineColors[index % lineColors.length],
          }))}
          height={300}
          margin={{
            top: isMd ? 100 : 50,
            bottom: 20,
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
