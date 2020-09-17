import axios from "axios";
import { put, call, fork, all, takeEvery } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  // LOGOUT_FAILURE,
  // LOGOUT_REQUEST,
  // LOGOUT_SUCCESS,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_REQUEST,
  PROFILE_EDIT_UPLOADING_SUCCESS,
  PROFILE_EDIT_UPLOADING_FAILURE,
  PROFILE_EDIT_UPLOADING_REQUEST,
} from "../types";
import { push } from "connected-react-router";

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

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}
// logout

// function* logout() {
//   try {
//     yield put({
//       type: LOGOUT_SUCCESS,
//     });
//   } catch (e) {
//     yield put({
//       type: LOGOUT_FAILURE,
//     });
//   }
// }
// function* watchLogout() {
//   yield takeEvery(LOGOUT_REQUEST, loginUser);
// }

// register
const registerUserAPI = (register) => {
  console.log("register", register);

  return axios.post("api/user", register);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log("sigup", result);
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

//user loading keep logging in when refresh page or route to other pages

const userLoadingAPI = (token) => {
  console.log(token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/auth/user", config);
};

function* userLoading(loadingAction) {
  try {
    console.log("userLoading", loadingAction);
    const result = yield call(userLoadingAPI, loadingAction.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// clear error

function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
    });
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

//profile change

const editProfileAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(
    `/api/user/${payload.userFirstName}/profile`,
    payload,
    config
  );
};

function* editProfile(action) {
  try {
    console.log(action, "editProfile");
    const result = yield call(editProfileAPI, action.payload);
    yield put({
      type: PROFILE_EDIT_UPLOADING_SUCCESS,
      payload: result,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: PROFILE_EDIT_UPLOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watcheditProfile() {
  yield takeEvery(PROFILE_EDIT_UPLOADING_REQUEST, editProfile);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    // fork(watchLogout),
    fork(watchuserLoading),
    fork(watchregisterUser),
    fork(watchclearError),
    fork(watcheditProfile),
  ]);
}
