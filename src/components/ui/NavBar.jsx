import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
const NavBar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <Box flexGrow={1}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component={"div"} flexGrow={1}>
            {name}
          </Typography>
          <Button
            variant="text"
            color="inherit"
            endIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
