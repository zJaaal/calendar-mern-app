import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
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

import { eventAddNew } from "../../actions/events";

const CalendarModal = ({ open, handleClose }) => {
  const initialError = "";
  //This might change
  //Keep the validations as they are
  const dateNow = moment().moment;
  const dateAfter = moment().add(1, "hours");

  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(dateNow);
  const [endDate, setEndDate] = useState(dateAfter);
  const [error, setError] = useState(initialError);

  const [formValues, setFormValues] = useState({
    title: "",
    note: "",
    start: dateNow,
    end: dateAfter,
  });

  const { note, title } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setError(initialError);
    setFormValues((state) => ({
      ...state,
      start: e,
    }));
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setError(initialError);
    setFormValues((state) => ({
      ...state,
      end: e,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formValues.start || !formValues.end)
      return alert("Please enter the dates");

    setError(initialError);

    if (formValues.start.isAfter(formValues.end)) {
      setError("End date is before Start date");
    }
    console.log(formValues);

    dispatch(eventAddNew(formValues));
    handleClose();
  };

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
        <Box sx={style} component="form" onSubmit={handleFormSubmit}>
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
                    renderInput={(props) => (
                      <TextField {...props} helperText={error} />
                    )}
                    label="Initial Day and Time"
                    value={startDate}
                    name="start"
                    onChange={handleStartDateChange}
                    minDateTime={dateNow}
                  />
                </Grid>
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Day and Time"
                    value={endDate}
                    name="end"
                    onChange={handleEndDateChange}
                    minDate={startDate}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Grid item marginTop={1}>
              <TextField
                id="Title"
                name="title"
                label="Event Title"
                placeholder="John's Birthday"
                variant="standard"
                value={title}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item marginTop={1}>
              <TextField
                multiline
                id="Note"
                label="Note"
                name="note"
                value={note}
                rows={6}
                onChange={handleInputChange}
                placeholder={"Here you can add details"}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <Button variant="contained" color="info" type="submit" fullWidth>
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
