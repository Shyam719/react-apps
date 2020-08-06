import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  ASYNC_START,
  ASYNC_END,
  HOME_PAGE_LOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";
import agent from "../../agent";
import { store } from "../../store";
import Loader from "../Loader";
import MainView from "./MainView";
import Tags from "./Tags";

const fetchData = async (dispatch, tab, articlesPromise) => {
  dispatch({ type: ASYNC_START, subtype: HOME_PAGE_LOADED });
  const res = await Promise.all([agent.Tags.all(), articlesPromise()]);
  if (res[0].status === 200 && res[1].status === 200) {
    dispatch({ type: HOME_PAGE_LOADED, payload: res, tab: tab });
    dispatch({ type: ASYNC_END, payload: res });
  } else {
    dispatch({ type: HOME_PAGE_LOADED, payload: res, error: true, tab: tab });
    dispatch({ type: ASYNC_END, payload: res });
  }
};

const fetchArticlesByTag = async (dispatch, tag) => {
  dispatch({ type: ASYNC_START, subtype: APPLY_TAG_FILTER });
  const res = await agent.Articles.byTag(tag);
  if (res.status === 200) {
    dispatch({ type: APPLY_TAG_FILTER, payload: res, tab: tag });
    dispatch({ type: ASYNC_END, payload: res });
  } else {
    dispatch({ type: APPLY_TAG_FILTER, payload: res, error: true, tab: tag });
    dispatch({ type: ASYNC_END, payload: res });
  }
};

const mapStateToProps = (state) => ({
  ...state.home,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterTab: (tag) => fetchArticlesByTag(dispatch, tag),
});

class Home extends React.Component {
  componentDidMount() {
    const tab = this.props.token ? "feed" : "all";
    const articlesPromise = this.props.token
      ? agent.Articles.feed
      : agent.Articles.all;
    fetchData(store.dispatch, tab, articlesPromise);
  }

  /*static getDerivedStateFromProps(nextProps, prevState) {
        console.log('...................... getDerivedStateFromProps');
        console.log(nextProps);
        if(!nextProps.token && prevState && prevState.token !== nextProps.token) {
            fetchArticlesOrFeed(store.dispatch, 'all');
        }
        return nextProps;
    }*/

  componentDidUpdate(preProp, prevState) {
    if (!this.props.token && preProp && preProp.token !== this.props.token) {
      fetchData(store.dispatch, "all", agent.Articles.all);
    }
  }

  renderDisplay() {
    return (
      <div className="home-page">
        <div className="container-fluid page">
          <div className="row">
            <MainView />
            <Tags tags={this.props.tags} onClickTag={this.props.onFilterTab} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderDisplay()}
        {this.props.loading && <Loader />}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
