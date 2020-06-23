import * as ACTIONTYPES from "../actions/actionTypes";

export const ArticlesListReducer = (state, action) => {
  switch (action.type) {
    case ACTIONTYPES.CHANGE_TAB:
      return {
        ...state,
        // articles: action.payload.data.articles,
        // articlesCount: action.payload.data.articlesCount,
        // tab: action.tab,
        tag: action.tag,
        tab: action.tab,
      };
    case ACTIONTYPES.TAG_FILTER:
      return {
        ...state,
        tag: action.tag,
      };
    default:
      return state;
  }
};
