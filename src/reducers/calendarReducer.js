import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
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
    default:
      return state;
  }
};
