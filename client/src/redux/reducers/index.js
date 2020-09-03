import { combineReducers } from "redux";
import { ConnectedRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: ConnectedRouter(history),
  });

export default createRootReducer;
