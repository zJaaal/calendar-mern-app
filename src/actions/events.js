import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../axios/axios";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

//Async actions

export const eventStartAddNew = (event) => async (dispatch, getState) => {
  const { uid, name } = getState().auth;

  try {
    const token = localStorage.getItem("token") || "";
    const res = await createEvent(event, token);

    if (res.data.status === "Completed") {
      console.log(res.data._doc);
      event.id = res.data._doc._id;
      event.user = {
        _id: uid,
        name: name,
      };

      dispatch(eventAddNew(event));
    } else if (res.data.status === "An error occured") {
      alert("Please contact an admin");
    }
  } catch (e) {
    if (e.response.data.errorMessage.includes("end")) {
      return alert("End date must be after start date");
    }
    alert(e.response.data.errorMessage);
  }
};

export const startEventsLoad = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token") || "";

    const res = await getEvents(token);

    const events = prepareEvents(res.data.events);

    dispatch(eventLoaded(events));
  } catch (e) {
    alert(e.response.data.errorMessage);
  }
};

export const startEventUpdate = (event) => async (dispatch) => {
  const updatedEvent = { ...event };

  //Sanitize the event
  delete event._id;
  delete event.user;
  delete event.__v;

  try {
    const token = localStorage.getItem("token") || "";
    await updateEvent(token, event, updatedEvent._id);
    dispatch(eventUpdated(updatedEvent));
  } catch (e) {
    if (e.response.data.errorMessage.includes("end")) {
      return alert("End date must be after start date");
    }
    alert(e.response.data.errorMessage);
  }
};

export const startEventDelete = () => async (dispatch, getState) => {
  const { _id } = getState().calendar.activeEvent;

  console.log(_id);

  try {
    const token = localStorage.getItem("token") || "";
    await deleteEvent(token, _id);
    dispatch(eventDeleteActive());
  } catch (e) {
    alert(e.response.data.errorMessage);
  }
};

//Sync actions

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventCleanActive = () => ({
  type: types.eventCleanActive,
});

const eventDeleteActive = () => ({
  type: types.eventDeleteActive,
});

const eventUpdated = (event) => ({
  type: types.eventEditActive,
  payload: event,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
