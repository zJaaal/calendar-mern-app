import { Box, Typography } from "@mui/material";
import React from "react";

const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <Box>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="caption" component={"strong"}>
        - {user.name}
      </Typography>
    </Box>
  );
};

export default CalendarEvent;
