import "./App.css";
import { createTheme, CssBaseline, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function CalendarApp() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <Typography variant="h3">Hello World</Typography>
      </Paper>
    </ThemeProvider>
  );
}

export default CalendarApp;
