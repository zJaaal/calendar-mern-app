import { Grid, Typography, Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CreateIcon from "@mui/icons-material/Create";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startRegister } from "../../actions/auth";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm(initialFormValues);

  const { name, email, password, confirmPassword } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) return alert("Passwords doesn't match");
    dispatch(startRegister(name, email, password));
  };

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
        component="form"
        onSubmit={handleSubmit}
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
                label="Name"
                name="name"
                value={name}
                variant="standard"
                type={"text"}
                onChange={handleInputChange}
                autoComplete="off"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="email-input"
                label="Email"
                name="email"
                value={email}
                variant="standard"
                type={"text"}
                onChange={handleInputChange}
                autoComplete="off"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="password-input"
                label="Password"
                name="password"
                value={password}
                variant="standard"
                type={"password"}
                onChange={handleInputChange}
                autoComplete="off"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="confirm-input"
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                variant="standard"
                type={"password"}
                onChange={handleInputChange}
                autoComplete="off"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                endIcon={<HowToRegIcon />}
                type="submit"
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
