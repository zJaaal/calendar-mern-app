import "./CalendarApp.css";
import { CssBaseline, Paper, Button } from "@mui/material";
import AppRouter from "./routes/AppRouter";

function CalendarApp() {
  return (
    <>
      <CssBaseline />
      <Paper>
        <AppRouter />
      </Paper>
    </>
  );
}

export default CalendarApp;
