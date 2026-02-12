import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A1929", // Un albastru foarte închis (Deep Dark Blue)
      paper: "#001E3C", // Puțin mai deschis pentru carduri
    },
    primary: {
      main: "#3399FF", // Albastru electric pentru accente
    },
    secondary: {
      main: "#ff4081", // Roz pentru elemente secundare
    },
    error: {
      main: "#FF4842", // Roșu aprins pentru modul VULNERABIL
    },
    success: {
      main: "#54D62C", // Verde neon pentru modul SECURIZAT
    },
    text: {
      primary: "#fff",
      secondary: "#B2BAC2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    // Font special pentru zona de cod/terminal
    // code: {
    //   fontFamily: '"Fira Code", "Consolas", monospace',
    //   fontSize: '0.9rem',
    // },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Scoatem gradientul default MUI
          border: "1px solid rgba(148, 164, 184, 0.12)", // Un border subtil
        },
      },
    },
  },
});

export default darkTheme;
