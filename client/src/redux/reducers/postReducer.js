import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_WRITE_REQUEST,
  POSTS_LOADING_REQUEST,
  POSTS_WRITE_FAILURE,
  POSTS_WRITE_SUCCESS,
} from "../types";

const initialState = {
  // only approved memeber can write
  isAuth: null,
  posts: [],
  postDetail: "",
  postCount: "",
  error: "",
  loading: false,
  writerId: "",
  // for searchbar
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
      };
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
