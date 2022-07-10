import {
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import moment from "moment";

const CalendarModal = ({ open, handleClose }) => {
  //This might change
  const dateNow = moment().add(1, "hours").toDate();
  const [value, setValue] = useState(dateNow);
  const [value2, setValue2] = useState(dateNow);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Grid container direction="column" p={2} rowSpacing={2}>
            <Grid item container alignItems={"center"}>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  New Event
                </Typography>
              </Grid>
              <Grid item marginLeft={1}>
                <ScheduleIcon color="primary" />
              </Grid>
            </Grid>
            <Divider />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Grid item container columnSpacing={2} marginTop={1}>
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Initial Day and Time"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    minDate={moment().Moment}
                  />
                </Grid>
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Day and Time"
                    value={value2}
                    onChange={(newValue) => {
                      setValue2(newValue);
                    }}
                    minDate={value}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Grid item marginTop={1}>
              <TextField
                id="Title"
                label="Event Title"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item marginTop={1}>
              <TextField
                id="Note"
                label="Note"
                multiline
                rows={6}
                placeholder={"Here you can add details"}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <Button variant="contained" color="info" fullWidth>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CalendarModal;
