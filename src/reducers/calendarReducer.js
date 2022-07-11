import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      id: moment().toDate(),
      title: "Eugenio's Birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      note: "Buy the cake!",
      user: {
        _id: 1233445,
        name: "Jalinson",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventCleanActive:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventEditActive:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case types.eventDeleteActive:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };
    default:
      return state;
  }
};
