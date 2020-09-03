import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import Router from "./routes/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/design.scss";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>
    </div>
  );
};

export default App;
