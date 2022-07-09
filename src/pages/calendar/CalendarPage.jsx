import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NavBar from "../../components/ui/NavBar";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTheme } from "@mui/material";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const theme = useTheme();
  const events = [
    {
      title: "Eugenio's Birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
    },
  ];

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: `${theme.palette.primary.light}`,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      display: "block",
    };
    return style;
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
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
