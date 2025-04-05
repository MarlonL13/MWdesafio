import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme"; // Importando o tema
import { DataProvider } from "./context/DataContext.jsx"; // Importando o Provider
import DashboardLayout from "./components/DashboardLayout.jsx";
import Headers from "./components/Header.jsx"; // Importando o Header

const App = () => {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Headers title={"Monitoramento Internet"} logoUrl="https://home.mw-solucoes.com/static/media/logoBranca.4bd75abacae784830b00e64bdb2331cb.svg" />
        <DashboardLayout />
      </ThemeProvider>
    </DataProvider>
  );
};

export default App;
