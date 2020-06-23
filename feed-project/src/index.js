import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
//import { BrowserRouter as Router } from 'react-router-dom';
import { history } from "./reducer";

import "./i18n";
import Loader from "./components/Loader";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  </Suspense>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
