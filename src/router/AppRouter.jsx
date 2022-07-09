import Grid from "@mui/material/Grid";
import { Routes, Route, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CalendarPage from "../pages/calendar/CalendarPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
const AppRouter = () => {
  return (
    <Grid container direction="row" height={"100vh"}>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/" element={<CalendarPage />} />
        <Route path="/*" element={<Navigate to={-1} />} />
      </Routes>
    </Grid>
  );
};

export default AppRouter;
