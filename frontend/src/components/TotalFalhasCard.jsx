import { useState } from "react";
import { Card, CardContent, Typography, Select, MenuItem } from "@mui/material";

const TotalFalhasCard = ({ data }) => {
  const historyData = data;
  const [periodo, setPeriodo] = useState(30);

  // Função para filtrar as falhas por período
  const getFalhasByPeriod = (data, days) => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - days);

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= pastDate && itemDate <= currentDate;
    });
  };

  const falhas = getFalhasByPeriod(historyData, periodo);

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        marginTop: 5,
        padding: 2,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Total de Falhas
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {falhas.length}
        </Typography>
        <Select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          fullWidth
          labelId="period-filter-label"
          inputProps={{
            "aria-label": "Filtrar por período",
            name: "period-filter",
          }}
          sx={{
            marginTop: 2,
            backgroundColor: "background.secondary",
            color: "text.primary",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "& .MuiSelect-icon": {
              color: "primary.main",
            },
          }}
        >
          <MenuItem value={30}>Últimos 30 dias</MenuItem>
          <MenuItem value={7}>Última semana</MenuItem>
          <MenuItem value={1}>Último dia</MenuItem>
        </Select>
      </CardContent>
    </Card>
  );
};

export default TotalFalhasCard;
