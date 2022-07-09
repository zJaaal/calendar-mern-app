import "./CalendarApp.css";
import { CssBaseline, Paper, Button } from "@mui/material";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

function CalendarApp() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Paper>
        <AppRouter />
      </Paper>
    </BrowserRouter>
  );
}

export default CalendarApp;
