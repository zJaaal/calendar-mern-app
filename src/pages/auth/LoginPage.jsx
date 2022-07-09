import { Grid, Typography, Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoginIcon from "@mui/icons-material/Login";

const LoginPage = () => {
  return (
    <Grid container item xs justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        direction={"column"}
        item
        xs={11}
        md={6}
        xl={6}
        alignItems={"center"}
        height={"70%"}
      >
        <Paper
          elevation={4}
          sx={{ width: "100%", padding: "10px", height: "100%" }}
        >
          <Grid container direction={"column"} height={"inherit"}>
            <Grid
              item
              container
              xs
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <EventAvailableIcon color="primary" sx={{ fontSize: "30px" }} />
              <Typography variant="h4" align={"center"}>
                Calendar
              </Typography>
            </Grid>
            <Grid item xs>
              <TextField
                id="email-input"
                label="Email"
                variant="standard"
                type={"text"}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="password-input"
                label="Password"
                variant="standard"
                type={"password"}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                endIcon={<LoginIcon />}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid
              item
              xs
              container
              justifyContent={"center"}
              alignItems={"end"}
            >
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
