// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#060810", // fundo geral
      secondary: "#16213f",
      paper: "#040c1c", // cor do card
    },
    primary: {
      main: "#576da5", // destaque 1
    },
    secondary: {
      main: "#74c172", // destaque 2
    },
    text: {
      primary: "#ffffff",
      secondary: "#576da5",
    },
    color: {
      primary: "#576da5", // destaque 1
      secondary: "#74c172", // destaque 2
      selected:"rgb(128, 160, 240)",
      highlight: "#02b2af"
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    }
  },
  typography: {
    fontFamily: 'Manrope, sans-serif', // Padrão para todos os textos
  },
});

export default theme;


