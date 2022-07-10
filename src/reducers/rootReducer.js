import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
});
