import React from "react";
import store from "../../store";
import { USER_LOADING_REQUEST } from "../../redux/types";
const LoadUser = () => {
  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  } catch (e) {
    console.log(e);
  }
};

export default LoadUser;
