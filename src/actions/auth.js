import { loginUser, registerUser, renewToken } from "../axios/axios";
import { types } from "../types/types";

//Async actions

export const startLogin = (email, password) => async (dispatch) => {
  try {
    const res = await loginUser(email, password);

    if (res.data.status === "Completed") {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token-init-date", Date.now());

      dispatch(login({ uid: res.data.uid, name: res.data.name }));
    } else if (res.data.status === "An error occured") {
      alert("Please contact an admin");
    }
  } catch (e) {
    if (e.response.data.errorMessage.includes("email")) {
      alert("Email is invalid");
    } else if (e.response.data.errorMessage.includes("password")) {
      alert("Password is invalid");
    } else {
      alert(e.response.data.errorMessage);
    }
  }
};

export const startRegister = (name, email, password) => async (dispatch) => {
  try {
    const res = await registerUser(name, email, password);

    if (res.data.status === "Completed") {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token-init-date", Date.now());

      dispatch(login({ uid: res.data.uid, name: res.data.name }));
    } else if (res.data.status === "An error occured") {
      alert("Please contact an admin");
    }
  } catch (e) {
    if (e.response.data.errorMessage.includes("user")) {
      alert("This email is already taken");
    } else if (e.response.data.errorMessage.includes("email")) {
      alert("Email is invalid");
    } else if (e.response.data.errorMessage.includes("password")) {
      alert(
        "Password must contain at least 8 characteres and must include: 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character"
      );
    } else if (e.response.data.errorMessage.includes("name")) {
      alert(
        "Name must contain at least 5 characters and cannot have more than 30 characters"
      );
    } else {
      alert(e.response.data.errorMessage);
    }
  }
};

export const startChecking = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token") || "";
    const res = await renewToken(token);
    dispatch(login({ uid: res.data.uid, name: res.data.name }));
  } catch (e) {
    dispatch(checkingFinish());
  }
};

//Sync actions

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => (dispatch) => {
  localStorage.clear();
  dispatch(logout());
};

const logout = () => ({
  type: types.authLogout,
});

const checkingFinish = () => ({
  type: types.authCheckingFinished,
});
