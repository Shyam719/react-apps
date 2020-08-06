import React from "react";
import {
  CHANGE_TAB,
  ASYNC_START,
  ASYNC_END,
} from "../../constants/actionTypes";
import ArticleList from "../Article/ArticleList";
import { connect } from "react-redux";
import agent from "../../agent";
import Loader from "../Loader";

export const fetchData = async (dispatch, tab, articlesPromise) => {
  try {
    dispatch({ type: ASYNC_START, subtype: CHANGE_TAB });
    const res = await articlesPromise();
    if (res.status === 200) {
      dispatch({ type: CHANGE_TAB, payload: res, tab: tab });
      dispatch({ type: ASYNC_END, payload: res });
    } else {
      dispatch({ type: ASYNC_END, payload: res });
    }
  } catch (e) {
    console.error(e);
  }
};

const GlobalFeedTab = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    props.onTabClick("all", agent.Articles.all);
  };
  const hrefLink = "#";
  return (
    <li className="nav-item">
      <a
        href={hrefLink}
        className={
          props.tab === "all"
            ? "nav-link active global-feed"
            : "nav-link global-feed"
        }
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = (e) => {
      e.preventDefault();
      props.onTabClick("feed", agent.Articles.feed);
    };
    const hrefLink = "#";
    return (
      <li className="nav-item">
        <a
          href={hrefLink}
          className={
            props.tab === "feed"
              ? "nav-link active your-feed"
              : "nav-link your-feed"
          }
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  const hrefLink = "#";
  return (
    <li className="nav-item">
      <a className="nav-link active" href={hrefLink}>
        {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.articlesList,
  token: state.common.token,
  loading: state.common.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, articlesPromise) =>
    fetchData(dispatch, tab, articlesPromise),
});

export const MainView = (props) => {
  return (
    <div className="col-sm-12 col-md-8 col-l-8">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>

        <ArticleList articles={props.articles} />
      </div>

      {props.loading && <Loader />}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
