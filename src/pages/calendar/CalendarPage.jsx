import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";
import { useTheme, IconButton, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import AddIcon from "@mui/icons-material/Add";

import NavBar from "../../components/ui/NavBar";
import CalendarEvent from "../../components/calendar/CalendarEvent";
import CalendarModal from "../../components/calendar/CalendarModal";
import useOpen from "../../hooks/useOpen";
import { eventSetActive } from "../../actions/events";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("last-view") || "month"
  );
  const { open, handleOpen, handleClose } = useOpen(false);

  const onDoubleClick = (e) => {
    handleOpen();
  };

  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("last-view", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: `${theme.palette.primary.main}`,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      display: "block",
    };
    return { style };
  };

  return (
    <Grid container item xs direction={"column"} rowSpacing={1}>
      <Grid item xs={1}>
        <NavBar />
      </Grid>
      <Grid
        item
        xs
        container
        direction={"column"}
        height={"100%"}
        sx={{ overflowY: "scroll" }}
      >
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          view={lastView}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          components={{
            event: CalendarEvent,
          }}
        />
      </Grid>
      <CalendarModal open={open} handleClose={handleClose} />
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          borderRadius: "100%",
          padding: "15px",
        }}
        onClick={handleOpen}
      >
        <AddIcon fontSize="large" />
      </Button>
    </Grid>
  );
};

export default CalendarPage;
