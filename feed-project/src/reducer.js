import common from "./reducers/common";
import auth from "./reducers/auth";
import articlesList from "./reducers/articleList";
import home from "./reducers/home";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
//import { routerReducer } from 'react-router-redux';

export const history = createBrowserHistory();

export default combineReducers({
  common,
  auth,
  articlesList,
  home,
  router: connectRouter(history),
  //router: routerReducer
});
