import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { history } from "./reducer";
import reducer from "./reducer";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { localStorageMiddleware } from "./middleware";

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(thunk, myRouterMiddleware, localStorageMiddleware);
  } else {
    return applyMiddleware(
      thunk,
      myRouterMiddleware,
      localStorageMiddleware,
      createLogger()
    );
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
