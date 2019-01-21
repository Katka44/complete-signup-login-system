import axios from "axios";
import {
  AUTH_USER_SUCCESS,
  SIGN_UP_USER_SUCCESS,
  AUTH_USER_FAIL,
  SIGN_UP_USER_FAIL,
  START_FETCHING,
  LOG_OUT
} from "./types";

export const startFetching = () => ({
  type: START_FETCHING
});

export const authUserSuccess = token => ({
  type: AUTH_USER_SUCCESS,
  payload: token
});

export const authUser = values => async dispatch => {
  dispatch(startFetching());
  try {
    const res = await axios.post("/api/v2/users/login", values);

    dispatch(authUserSuccess(res.data));
  } catch (err) {
    dispatch({
      type: AUTH_USER_FAIL,
      payload: err.response.data
    });
  }
};

export const signUpUser = values => async dispatch => {
  dispatch(startFetching());
  try {
    await axios.post("/api/v2/users/signup/temp", values);

    dispatch({
      type: SIGN_UP_USER_SUCCESS,
      payload:
        "You have succesfully signed up! Please wait for the approval from admin."
    });
  } catch (err) {
    dispatch({
      type: SIGN_UP_USER_FAIL,
      payload: err.response.data
    });
  }
};

export const logOut = () => async dispatch => {
  await axios.get("/api/v2/users/logout");

  dispatch({
    type: LOG_OUT
  });
};

export const checkUser = () => async dispatch => {
  dispatch(startFetching());
  try {
    const res = await axios.get("/api/v2/users/current");

    dispatch(authUserSuccess(res.data));
  } catch (err) {
    dispatch(logOut());
  }
};
