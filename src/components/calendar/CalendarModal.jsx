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
  //Keep the validations as they are
  const dateNow = moment().moment;
  const dateAfter = moment().add(1, "hours").toDate();
  const [startDate, setStartDate] = useState(dateNow);
  const [endDate, setEndDate] = useState(dateAfter);

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
      aria-labelledby="New Event"
      aria-describedby="Here you can create new events"
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
              <Grid item marginRight={1}>
                <ScheduleIcon color="primary" />
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  New Event
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Grid item container columnSpacing={2} marginTop={1}>
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Initial Day and Time"
                    value={startDate}
                    onChange={(newDate) => {
                      setStartDate(newDate);
                    }}
                    minDate={dateNow}
                  />
                </Grid>
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Day and Time"
                    value={endDate}
                    onChange={(newDate) => {
                      setEndDate(newDate);
                    }}
                    minDate={startDate}
                    minDateTime={startDate}
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
