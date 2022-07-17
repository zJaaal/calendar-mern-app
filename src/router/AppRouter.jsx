import Grid from "@mui/material/Grid";
import { Routes, Route, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CalendarPage from "../pages/calendar/CalendarPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startChecking } from "../actions/auth";
import { CircularProgress } from "@mui/material";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <Grid container direction="row" height={"100vh"}>
        <Grid container item xs justifyContent={"center"} alignItems={"center"}>
          <CircularProgress size={"90px"} />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="row" height={"100vh"}>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoutes>
              <CalendarPage />
            </PrivateRoutes>
          }
        />
        <Route path="/*" element={<Navigate to={-1} />} />
      </Routes>
    </Grid>
  );
};

export default AppRouter;
