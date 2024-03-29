import moment from "moment";

import { momentLocalizer, Calendar } from "react-big-calendar";
import { Grid, Typography, useTheme, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import NavBar from "../../components/ui/NavBar";
import CalendarEvent from "../../components/calendar/CalendarEvent";
import CalendarModal from "../../components/calendar/CalendarModal";
import {
  eventCleanActive,
  eventSetActive,
  startEventDelete,
  startEventsLoad,
} from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("last-view") || "month"
  );

  useEffect(() => {
    dispatch(startEventsLoad());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = () => {
    dispatch(eventCleanActive());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("last-view", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: `${
        uid === event.user._id
          ? theme.palette.primary.main
          : theme.palette.grey["900"]
      }`,
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
      <CalendarModal />
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          borderRadius: "100%",
          padding: "15px",
          zIndex: 100,
        }}
        onClick={() => dispatch(uiOpenModal())}
      >
        <AddIcon fontSize="large" />
      </Button>
      {activeEvent && (
        <Button
          variant="contained"
          color="error"
          sx={{
            position: "fixed",
            bottom: "25px",
            left: "25px",
            borderRadius: "100%",
            padding: "15px",
            zIndex: 200,
          }}
          onClick={() => dispatch(startEventDelete())}
        >
          <DeleteIcon fontSize="large" />
        </Button>
      )}
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
          onSelectSlot={onSelectSlot}
          selectable={true}
          onSelectEvent={onSelect}
          onView={onViewChange}
          components={{
            event: CalendarEvent,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
