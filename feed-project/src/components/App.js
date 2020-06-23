import React, { lazy } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  APP_LOAD,
  REDIRECT,
  ASYNC_START,
  ASYNC_END,
} from "../constants/actionTypes";
import { store } from "../store";
import { push } from "react-router-redux";
import agent from "../agent";
import { withTranslation } from "react-i18next";

const Header = lazy(() => import("./Header/Header"));
const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));
const Article = lazy(() => import("./Article/Article"));
const Profile = lazy(() => import("./Profile/Profile"));

const fetchUserInfo = async (dispatch, token) => {
  dispatch({ type: ASYNC_START, subtype: APP_LOAD });
  const res = await agent.Auth.user();
  if (res.status === 200) {
    dispatch({ type: APP_LOAD, payload: res, token: token, skipTracing: true });
    dispatch({ type: ASYNC_END, payload: res });
  } else {
    dispatch({ type: APP_LOAD, payload: res, error: true });
    dispatch({ type: ASYNC_END, payload: res });
  }
};

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    token: state.common.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (token) => (token ? fetchUserInfo(dispatch, token) : null),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class App extends React.Component {
  /*componentWillReceiveProps(nextProps) {
    console.log('...................... compwillreceiveprops');
    console.log(nextProps);
    if(nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }*/
  constructor() {
    super();
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("...................... getDerivedStateFromProps");
    console.log(nextProps);
    if (
      nextProps.redirectTo &&
      prevState &&
      prevState.redirectTo !== nextProps.redirectTo
    ) {
      store.dispatch(push(nextProps.redirectTo));
      prevState.onRedirect();
    }
    return nextProps;
  }

  componentDidMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? token : null);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register" component={Register} />
          <PrivateRoute path="/article">
            <Article />
          </PrivateRoute>
          <PrivateRoute path="/posts">
            <Profile />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    );
  }
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const state = store.getState();
        return state.common.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
