import React, { Suspense } from "react";
import Context from "./utils/context";
import Routes from "./routes";
import Loader from "./components/Loader";

import AuthReducer from "./store/reducers/auth";
import { combineReducers, initialState } from "./utils/reducer";
import { CommonReducer } from "./store/reducers/common";
import { ArticlesListReducer } from "./store/reducers/articleList";

const ContextState = () => {
  const [state, dispatch] = React.useReducer(
    combineReducers(AuthReducer, CommonReducer, ArticlesListReducer),
    initialState
  );
  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </Context.Provider>
  );
};

export default ContextState;
