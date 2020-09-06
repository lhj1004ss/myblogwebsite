import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
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
export default function* postSaga() {
  yield all([fork(watchLoadPosts)]);
}
