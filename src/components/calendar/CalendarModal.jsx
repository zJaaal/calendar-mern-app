import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

import {
  eventCleanActive,
  eventStartAddNew,
  startEventUpdate,
} from "../../actions/events";
import { uiCloseModal } from "../../actions/ui";
import Save from "@mui/icons-material/Save";

//This might change
//Keep the validations as they are
const dateNow = moment();
const dateAfter = moment().add(1, "hours");

const initialError = "";
const initialFormValues = {
  title: "",
  notes: "",
  start: dateNow,
  end: dateAfter,
};

const CalendarModal = () => {
  const dispatch = useDispatch();
  const { uid, name } = useSelector((state) => state.auth);
  const { activeEvent } = useSelector((state) => state.calendar);
  const { isOpen } = useSelector((state) => state.ui);

  const [error, setError] = useState(initialError);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    setError(initialError);
    if (!activeEvent) {
      setFormValues(initialFormValues);
    } else
      setFormValues({
        ...activeEvent,
        start: moment(activeEvent.start),
        end: moment(activeEvent.end),
      }); //Calendar works with date object and Picker with Moment object
  }, [activeEvent]);

  const { notes, title, start, end } = formValues;

  const handleClose = () => {
    dispatch(eventCleanActive());
    dispatch(uiCloseModal());
  };

  const handleInputChange = ({ target }) => {
    setFormValues((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const handleStartDateChange = (e) => {
    setError(initialError);
    setFormValues((state) => ({
      ...state,
      start: e,
    }));
  };

  const handleEndDateChange = (e) => {
    setError(initialError);
    setFormValues((state) => ({
      ...state,
      end: e,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!start || !end) return alert("Please enter the dates");

    setError(initialError);

    if (start.isAfter(end)) {
      return setError("End date is before Start date");
    }

    if (notes != undefined && !notes.trim().length) {
      delete formValues.notes;
    }

    if (activeEvent) {
      dispatch(
        startEventUpdate({
          ...formValues,
          start: start.toDate(),
          end: end.toDate(),
        })
      );
    } else {
      dispatch(
        eventStartAddNew({
          ...formValues,
          start: start.toDate(),
          end: end.toDate(),
        })
      );
    }

    setFormValues(initialFormValues);
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
      open={isOpen}
      onClose={handleClose}
      onRequest
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style} component="form" onSubmit={handleFormSubmit}>
          <Grid container direction="column" p={2} rowSpacing={2}>
            <Grid item container alignItems={"center"}>
              <Grid item marginRight={1}>
                <ScheduleIcon color="primary" />
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  {!activeEvent ? "New Event" : "Update Event"}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Grid
                item
                container
                columnSpacing={2}
                rowSpacing={2}
                marginTop={1}
              >
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Initial Day and Time"
                    value={start}
                    name="start"
                    onChange={handleStartDateChange}
                    minDateTime={dateNow}
                  />
                </Grid>
                <Grid item>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} helperText={error} />
                    )}
                    label="End Day and Time"
                    value={end}
                    name="end"
                    onChange={handleEndDateChange}
                    minDateTime={moment(start).add(1, "hours")}
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
                name="notes"
                value={notes}
                rows={6}
                onChange={handleInputChange}
                placeholder={"Here you can add details"}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="info"
                type="submit"
                endIcon={<SaveIcon />}
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CalendarModal;
