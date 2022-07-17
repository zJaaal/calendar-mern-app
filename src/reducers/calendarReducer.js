import moment from "moment";
import { types } from "../types/types";

// {
//   id: moment().toDate(),
//   title: "Eugenio's Birthday",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   notes: "Buy the cake!",
//   user: {
//     _id: 1233445,
//     name: "Jalinson",
//   },
// },

const initialState = {
  events: [],
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
          event._id === action.payload._id ? action.payload : event
        ),
      };
    case types.eventDeleteActive:
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== state.activeEvent._id
        ),
        activeEvent: null,
      };
    case types.eventLoaded: {
      return {
        ...state,
        events: [...action.payload],
      };
    }
    case types.eventLogout: {
      return initialState;
    }
    default:
      return state;
  }
};
