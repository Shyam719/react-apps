import {
  CHANGE_TAB,
  ASYNC_END,
  HOME_PAGE_LOADED,
  APPLY_TAG_FILTER,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return {
        ...state,
        articles: action.payload.data.articles,
        articlesCount: action.payload.data.articlesCount,
        tab: action.tab,
        tag: null,
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].data.tags,
        articles: action.payload[1].data.articles,
        articlesCount: action.payload[1].data.articlesCount,
        tab: action.tab,
        tag: null,
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.data.articles,
        articlesCount: action.payload.data.articlesCount,
        tab: action.tab,
        tag: action.tab,
      };
    case ASYNC_END:
      return { ...state, loading: false };
    default:
      return state;
  }
};
