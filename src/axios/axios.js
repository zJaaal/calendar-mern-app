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
