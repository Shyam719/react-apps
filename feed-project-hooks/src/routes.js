import React, { lazy, useContext, useEffect } from "react";
import { Switch, Route, Redirect, Router } from "react-router";
import history from "./utils/history";
import Context from "./utils/context";
import agent from "./utils/agent";
import { APP_LOAD } from "./store/actions/actionTypes";

const Header = lazy(() => import("./components/Header/Header"));
const Home = lazy(() => import("./components/Home/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const Article = lazy(() => import("./components/Article/Article"));
const Profile = lazy(() => import("./components/Profile/Profile"));

const PrivateRoute = ({ component: Component, auth }) => (
  <Route
    render={(props) =>
      auth === true ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const Routes = () => {
  const { state, dispatch } = useContext(Context);
  //debugger;

  const fetchUserData = async (token) => {
    const res = await agent.Auth.user();
    if (res.status === 200) {
      dispatch({ type: APP_LOAD, payload: res, token: token });
    } else {
      dispatch({ type: APP_LOAD, payload: res, error: true });
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }
    fetchUserData(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register" component={Register} />
          <PrivateRoute
            path="/article"
            auth={state.isAuthenticated}
            component={Article}
          />
          <PrivateRoute
            path="/posts"
            auth={state.isAuthenticated}
            component={Profile}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
