import { Grid, Typography, Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CreateIcon from "@mui/icons-material/Create";
const RegisterPage = () => {
  return (
    <Grid container item xs justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        direction={"column"}
        item
        xs={11}
        md={9}
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
              <CreateIcon color="primary" sx={{ fontSize: "30px" }} />
              <Typography variant="h4" align={"center"}>
                Register
              </Typography>
            </Grid>
            <Grid item xs>
              <TextField
                id="name-input"
                label="Email"
                variant="standard"
                type={"text"}
                fullWidth
              />
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
              <TextField
                id="confirm-input"
                label="Confirm Password"
                variant="standard"
                type={"password"}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                endIcon={<HowToRegIcon />}
                fullWidth
              >
                Create Account
              </Button>
            </Grid>
            <Grid
              item
              xs
              container
              justifyContent={"center"}
              alignItems={"end"}
            >
              <Link to="/login">
                <Button variant="text">Already have an account?</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
