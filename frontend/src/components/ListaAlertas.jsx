import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import AlertCard from "./AlertCard";

const ListaAlertas = ({ data }) => {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        marginTop: 5,
        padding: 2,
        textAlign: "start",
        height: 465,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Falhas Recentes
        </Typography>
        <Box
          sx={{
            overflowY: "auto",
            flexGrow: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(255,255,255,0.3)",
            },
            "&::-webkit-scrollbar-button": {
              display: "none",
              height: 0,
              width: 0,
            },
            scrollbarWidth: "thin", // Firefox
            scrollbarColor: "rgba(255,255,255,0.2) rgba(255,255,255,0.05)", // Firefox
          }}
        >
          {data.map((item, index) => (
            <AlertCard
              key={index}
              date={dayjs(item.downHistory.date).format("DD/MM/YYYY HH:mm")}
              nome={item.downHistory.nome}
              read={item.read}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListaAlertas;
