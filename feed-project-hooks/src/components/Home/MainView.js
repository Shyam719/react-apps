import React, { useContext, useEffect, useState } from "react";
import agent from "../../utils/agent";
import Context from "../../utils/context";
import { CHANGE_TAB } from "../../store/actions/actionTypes";
import ArticleList from "../Article/ArticleList";

const fetchData = async (dispatch, tab, articlesPromise, tag) => {
  const res = await (tag ? articlesPromise(tag) : articlesPromise());
  if (res.status === 200) {
    //dispatch({ type: CHANGE_TAB, payload: res, tab: tab, tag: tag });
    //dispatch({ type: CHANGE_TAB, tag: tag });
    return res.data.articles;
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
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
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
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
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

const MainView = () => {
  const { state, dispatch } = useContext(Context);
  const initialState = {
    articles: [],
    tab: null,
  };
  const [data, setData] = useState(initialState);
  const onTabClick = async (tab, articlesPromise) => {
    /* const articles = await fetchData(dispatch, tab, articlesPromise);
    setData({
      ...data,
      articles,
      tab: tab,
    }); */
    dispatch({ type: CHANGE_TAB, tab: tab });
  };
  useEffect(() => {
    console.log(state.tag);
    const tab = state.tag
      ? state.tag
      : state.tab
      ? state.tab
      : state.isAuthenticated
      ? "feed"
      : "all";
    const articlesPromise = state.tag
      ? agent.Articles.byTag
      : tab === "feed"
      ? agent.Articles.feed
      : agent.Articles.all;
    //debugger;
    (async () => {
      const articles = await fetchData(
        dispatch,
        tab,
        articlesPromise,
        state.tag
      );
      setData({
        ...data,
        articles,
        tab: tab,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuthenticated, state.tag, state.tab]);
  return (
    <div className="col-12">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={state.token}
            tab={data.tab}
            onTabClick={onTabClick}
          />
          <GlobalFeedTab tab={data.tab} onTabClick={onTabClick} />
          <TagFilterTab tag={state.tag} />
        </ul>

        <ArticleList articles={data.articles} />
      </div>
    </div>
  );
};

export default MainView;
