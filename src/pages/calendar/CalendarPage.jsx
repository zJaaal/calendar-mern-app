import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";
import { useTheme } from "@mui/material";

import "react-big-calendar/lib/css/react-big-calendar.css";

import NavBar from "../../components/ui/NavBar";
import CalendarEvent from "../../components/calendar/CalendarEvent";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const theme = useTheme();
  const events = [
    {
      title: "Eugenio's Birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      //All add the info of the user so everyone knows who made the event
      user: {
        _id: 1233445,
        name: "Jalinson",
      },
    },
  ];

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
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
