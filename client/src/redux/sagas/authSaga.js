import axios from "axios";
import { put, call, fork, all, takeEvery } from "redux-saga/effects";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types";

// login

const loginUserAPI = (loginData) => {
  console.log(loginData, "logindata");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};
function* loginUser(loginAction) {
  try {
    const result = yield call(loginUserAPI, loginAction.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUSer() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

export default function* authSaga() {
  yield all([fork(watchLoginUSer)]);
}
