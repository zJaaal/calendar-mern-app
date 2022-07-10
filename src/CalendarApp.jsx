import "./CalendarApp.css";
import { CssBaseline, Paper, Button } from "@mui/material";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import StoreProvider from "./store/StoreProvider";

function CalendarApp() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Paper>
        <StoreProvider>
          <AppRouter />
        </StoreProvider>
      </Paper>
    </BrowserRouter>
  );
}

export default CalendarApp;
