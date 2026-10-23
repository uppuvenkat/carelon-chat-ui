
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#123c50",
    },
    secondary: {
      main: "#176b70",
    },
    background: {
      default: "#f3f7f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#203642",
      secondary: "#647782",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", Arial, sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
