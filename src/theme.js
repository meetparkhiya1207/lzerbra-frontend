// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5A3A1B",
      maindark: "#b39f7dff",
      lightmain: "#705f44cb"
    },
    secondary: {
      main: "#C4A484",
      maindark: "#5A3A1B",
    },
    success: {
      main: "#E6D3B3",
      maindark: "#FFD580",
    },
    backgroundcolor: {
      main: "#FAF6F0", // Amber
    },
    typography: {
      fontFamily:"'Poppins', sans-serif",
    },
  },
});

export default theme;
