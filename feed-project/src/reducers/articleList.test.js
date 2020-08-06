import articleList from "./articleList";
import {
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  APPLY_TAG_FILTER,
  ASYNC_END,
} from "../constants/actionTypes";
import { findAllByAltText } from "@testing-library/react";

describe("when article list reducer invokes", () => {
  const state = {
    appLoaded: true,
    appName: "Feed App",
    currentUser: { username: "Shyam11" },
    redirectTo: "/",
    token: "FFGHJFGHJKFGHJKCGHJ#",
  };

  const changeTabAction = {
    type: CHANGE_TAB,
    payload: {
      data: {
        articles: [],
        articlesCount: 0,
      },
    },
    tab: "all",
  };

  const homePageLoadedAction = {
    type: HOME_PAGE_LOADED,
    payload: [
      {
        data: {
          tags: [],
        },
      },
      {
        data: {
          articles: [],
          articlesCount: 0,
          tab: "all",
          tag: null,
        },
      },
    ],
    tab: "all",
    pager: 1,
  };

  const tagFilterAction = {
    type: APPLY_TAG_FILTER,
    payload: {
      data: {
        articles: [],
        articlesCount: 0,
        tab: "all",
        tag: null,
      },
    },
    tab: "all",
    pager: 1,
  };

  const aysncEndAction = {
    type: ASYNC_END,
    loading: false,
  };

  it("load articles into the state", () => {
    expect(articleList(state, changeTabAction)).toEqual({
      ...state,
      articles: [],
      articlesCount: 0,
      tab: "all",
      tag: null,
    });
  });

  it("should fire home page loaded action", () => {
    expect(articleList(state, homePageLoadedAction)).toEqual({
      ...state,
      articles: [],
      articlesCount: 0,
      tab: "all",
      tag: null,
      tags: [],
      pager: 1,
    });
  });

  it("should fire tag filter action", () => {
    expect(articleList(state, tagFilterAction)).toEqual({
      ...state,
      articles: [],
      articlesCount: 0,
      tab: "all",
      tag: "all",
      pager: 1,
    });
  });

  it("should fire async end action", () => {
    expect(articleList(state, aysncEndAction)).toEqual({
      ...state,
      loading: false,
    });
  });
});
