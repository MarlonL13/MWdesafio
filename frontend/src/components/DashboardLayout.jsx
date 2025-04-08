import { useContext, useMemo } from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { DataContext } from "../context/DataContext";
import TotalFalhasCard from "./TotalFalhasCard";
import TipoFalhasChart from "./TipoFalhasChart";
import GraficoLinha from "./GraficoLinha";
import ListaAlertas from "./ListaAlertas";
import { LineChartData } from "../utils/dataProcessing";

const DashboardLayout = () => {
  const { historyData, alertData, loading } = useContext(DataContext);

  const pingData = useMemo(
    () => LineChartData(historyData, "ping"),
    [historyData]
  );
  const traficInData = useMemo(
    () => LineChartData(historyData, "entrada"),
    [historyData]
  );
  const traficOutData = useMemo(
    () => LineChartData(historyData, "saida"),
    [historyData]
  );
  const powerRxData = useMemo(
    () => LineChartData(historyData, "RX"),
    [historyData]
  );
  const powerTxData = useMemo(
    () => LineChartData(historyData, "TX"),
    [historyData]
  );

  if (loading) {
    return (
      <Box
        role="alert"
        aria-live="polite"
        aria-busy="true"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          gap: 2,
        }}
      >
        <CircularProgress aria-label="Loading dashboard data" />
        <Typography variant="body1" component="p">
          Carregando o Dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box px={5} mt={0}>
      {/* Grid Superior */}
      <Grid container spacing={2}>
        {/* Coluna esquerda com dois cards */}
        <Grid size={{ sm: 12, md: 4 }}>
          <Box display="flex" flexDirection="column">
            <TotalFalhasCard data={historyData} />
            <TipoFalhasChart data={historyData} />
          </Box>
        </Grid>

        {/* Coluna direita com lista de alertas */}
        <Grid size={{ sm: 12, md: 8 }}>
          <ListaAlertas data={alertData} />
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={2} mt={5}>
        {[
          { data: pingData, title: "Falhas de Ping" },
          { data: traficInData, title: "Falhas de Tráfego de Entrada" },
          { data: traficOutData, title: "Falhas de Tráfego de Saída" },
          { data: powerRxData, title: "Falhas de Potência RX" },
          { data: powerTxData, title: "Falhas de Potência TX" },
        ].map((grafico, index, array) => (
          <Grid
            size={{
              md: 12,
              lg: array.length % 2 === 1 && index === array.length - 1 ? 12 : 6,
            }}
            key={grafico.title}
          >
            <GraficoLinha data={grafico.data} title={grafico.title} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardLayout;
