import axios from "axios";
import { put, call, fork, all, takeEvery } from "redux-saga/effects";
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_LOADING_FAILURE,
} from "../types";
import { push } from "connected-react-router";

// load comments
// const loadCommentsAPI = (payload) => {
//   console.log(payload, "loadCommentAPI ID");
//   return axios.get(`/api/post/${payload}/comments`);
// };

// function* loadComments(action) {
//  try {
//     const result = yield call(loadCommentsAPI, action.payload);
//     console.log("loadcomments", result);
//     yield put({
//       type: COMMENT_LOADING_SUCCESS,
//       payload: result.data,
//     });
//   } catch (e) {
//     console.log(e);
//     yield put({
//       type: COMMENT_LOADING_FAILURE,
//       payload: e,
//     });
//     yield push("/");
//   }
// }

// function* watchLoadComments() {
//   yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
// }

// // upload comments

// const uploadCommentsAPI = (payload) => {
//   console.log("loadComment ID", payload.id);
//   return axios.post(`/api/post/${payload.id}/comments`, payload);
// };

// function* uploadComments(action) {
//   try {
//     console.log(action);
//     const result = yield call(uploadCommentsAPI, action.payload);
//     console.log("UploadComment", result);
//     yield put({
//       type: COMMENT_UPLOADING_SUCCESS,
//       payload: result.data,
//     });
//   } catch (e) {
//     console.log(e);
//     yield put({
//       type: COMMENT_UPLOADING_FAILURE,
//       payload: e,
//     });
//     yield push("/");
//   }
// }

// function* watchupLoadComments() {
//   yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
// }

// export default function* commentSaga() {
//   yield all([fork(watchLoadComments), fork(watchupLoadComments)]);
// }

// Load Comment

const loadCommentsAPI = (payload) => {
  console.log(payload, "loadCommentAPI ID");
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    console.log(result);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    });
    yield push("/");
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// UpLoad Comment

const uploadCommentsAPI = (payload) => {
  console.log(payload.id, "loadCommentAPI ID");
  return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* uploadComments(action) {
  try {
    const result = yield call(uploadCommentsAPI, action.payload);
    console.log(result, "UploadComment");
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e,
    });
    yield push("/");
  }
}

function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}

export default function* commentSaga() {
  yield all([fork(watchLoadComments), fork(watchUpLoadComments)]);
}
