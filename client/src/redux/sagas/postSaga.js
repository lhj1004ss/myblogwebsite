import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
} from "../types";
import axios from "axios";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";

const loadPostAPI = () => {
  return axios.get("/api/post");
};
function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log("loadposts result", result);
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    // go to home
    yield push("/");
  }
}
function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

//upload post

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};
function* uploadPosts(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    console.log("uploadpost action", action);
    console.log("uploadPostAPI, action.payload", result);

    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    // go to detail page after posting
    yield put(push(`/post${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    // go to home
    yield push("/");
  }
}
function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchuploadPosts)]);
}
