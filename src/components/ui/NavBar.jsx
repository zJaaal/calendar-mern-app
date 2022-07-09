import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
const NavBar = () => {
  return (
    <Box flexGrow={1}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component={"div"} flexGrow={1}>
            Jalinson
          </Typography>
          <Button variant="text" color="inherit" endIcon={<LogoutIcon />}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
