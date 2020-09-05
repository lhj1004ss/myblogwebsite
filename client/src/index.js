import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoadUser from "./components/auth/LoadUser";

// this is a little faster than useEffect
LoadUser();

ReactDOM.render(<App />, document.getElementById("root"));
