import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_SUCCESS,
  LOGOUT_REQUEST,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
  USER_LOADING_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  PROFILE_EDIT_UPLOADING_REQUEST,
  PROFILE_EDIT_UPLOADING_SUCCESS,
  PROFILE_EDIT_UPLOADING_FAILURE,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: false,
  user: "",
  userId: "",
  userFirstName: "",
  userLastName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
  previousMsg: "",
  shortMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // register, logout and login are the same return
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        erroMsg: "",
      };
    // logout fail and login fail return the same
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuth: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        userId: null,
        isAuth: false,
        isLoading: false,
        userRole: null,
        erroMsg: "",
      };
    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userFirstName: action.payload.firstname,
        userLastName: action.payload.lastname,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
        userRole: "",
      };
    case PROFILE_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        posts: [],
        isLoading: true,
      };
    case PROFILE_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.data.success_msg,
        errorMsg: "",
        previousMsg: "",
      };
    case PROFILE_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMsg: "",
        shortMsg: action.payload.data.short_msg,
        errorMsg: action.payload.data.fail_msg,
        previousMsg: action.payload.data.match_msg,
      };
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        previousMsg: "",
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: "Clear Error Fail",
        previousMsg: "Clear Error Fail",
      };
    default:
      return state;
  }
};

export default authReducer;
