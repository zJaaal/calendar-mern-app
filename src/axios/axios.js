import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Auth Endpoints

//Login
export const loginUser = (email, password) => {
  return instance.post("/auth/login", {
    email,
    password,
  });
};
//Register
export const registerUser = (name, email, password) => {
  return instance.post("/auth/register", {
    name,
    email,
    password,
  });
};

export const renewToken = (token) => {
  return instance.get("/auth/renew", { headers: { "x-token": token } });
};

//Events Endpoints

//Create event
export const createEvent = (event, token) => {
  return instance.post(
    "/events",
    { ...event },
    { headers: { "x-token": token } }
  );
};

//Get all events
export const getEvents = (token) => {
  return instance.get("/events", { headers: { "x-token": token } });
};

//Update Event
export const updateEvent = (token, event, eventId) => {
  return instance.put(
    `/events/${eventId}`,
    { ...event },
    {
      headers: { "x-token": token },
    }
  );
};
//Delete event
export const deleteEvent = (token, eventId) => {
  return instance.delete(`/events/${eventId}`, {
    headers: { "x-token": token },
  });
};
