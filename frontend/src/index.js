import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "antd/dist/antd.css";

import "./index.css";
import history from "./history";
import App from "./App";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer, compose(composeWithDevTools()));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
