import React, { useContext, useMemo } from "react";
import { DataContext } from "../context/DataContext";
import TotalFalhasCard from "./TotalFalhasCard";
import TipoFalhasChart from "./TipoFalhasChart";
import GraficoLinha from "./GraficoLinha";
import ListaAlertas from "./ListaAlertas";
import { LineChartData } from "../utils/dataProcessing";

const DashboardLayout = () => {
  const { historyData, alertData, loading } = useContext(DataContext);
  console.log(historyData);
  console.log(alertData);

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
    return <div>Loading...</div>;
  }
  return (
    <div style={{ padding: "20px" }}>
  {/* Grid superior */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr", // 1/3 + 2/3
      gap: "20px",
    }}
  >
    {/* Coluna da esquerda com dois cards empilhados */}
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TotalFalhasCard data={historyData} />
      <TipoFalhasChart data={historyData} />
    </div>

    {/* Lista de alertas ocupando 2/3 da largura */}
    <ListaAlertas data={alertData} />
  </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {[
          { data: pingData, title: "Falhas de Ping" },
          { data: traficInData, title: "Falhas de Tráfego de Entrada" },
          { data: traficOutData, title: "Falhas de Tráfego de Saída" },
          { data: powerRxData, title: "Falhas de Potência RX" },
          { data: powerTxData, title: "Falhas de Potência TX" },
        ].map((grafico, index, array) => (
          <div
            key={grafico.title}
            style={
              array.length % 2 === 1 && index === array.length - 1
                ? { gridColumn: "span 2" }
                : {}
            }
          >
            <GraficoLinha data={grafico.data} title={grafico.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
