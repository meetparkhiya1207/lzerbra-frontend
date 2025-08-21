// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5A3A1B", // Indigo
      maindark: "#E6D3B3", // Indigo
    },
    secondary: {
      main: "#C4A484", // Purple
      maindark: "#5A3A1B", // Purple
    },
    success: {
      main: "#E6D3B3", // Green
      maindark: "#FFD580", // Green
    },
    backgroundcolor: {
      main: "#FAF6F0", // Amber
    },
    typography: {
      fontFamily: "'Rubik', sans-serif",
    },
  },
});

export default theme;
