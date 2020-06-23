import React, { Fragment } from "react";
import ListErrors from "../ListErrors";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import {
  UPDATE_FIELD_AUTH,
  ASYNC_START,
  REGISTER,
  ASYNC_END,
  REGISTER_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import agent from "../../agent";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const mapStateToProps = (state) => {
  if (state.auth) {
    state.auth.email = state.auth.email
      ? state.auth.email
      : "shyam11@gmail.com";
    state.auth.password = state.auth.password ? state.auth.password : "shyam11";
    state.auth.username = state.auth.username ? state.auth.username : "Shyam";
  }
  return { ...state.auth, loading: state.common.loading };
};

const onFieldChange = (key, value) => (dispatch) =>
  dispatch({ type: UPDATE_FIELD_AUTH, key, value });
const onSubmit = (email, password, username) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_START, subtype: REGISTER });
    const res = await agent.Auth.register(email, password, username);
    if (res.status === 200) {
      dispatch({ type: REGISTER, payload: res });
      dispatch({ type: ASYNC_END, payload: res });
    } else {
      dispatch({ type: REGISTER, payload: res, error: true });
      dispatch({ type: ASYNC_END, payload: res });
    }
  };
};
const onUnload = () => (dispatch) => dispatch({ type: REGISTER_PAGE_UNLOADED });

class Register extends React.Component {
  constructor() {
    super();
    this.onFieldChange = (key, value) => this.props.onFieldChange(key, value);
    this.submitForm = (email, password, username) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password, username);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderDisplay() {
    const { email, password, username, t } = this.props;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{t("header.menu.signup")}</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password, username)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) =>
                        this.onFieldChange("username", e.target.value)
                      }
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) =>
                        this.onFieldChange("email", e.target.value)
                      }
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) =>
                        this.onFieldChange("password", e.target.value)
                      }
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
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

export default withTranslation()(
  connect(mapStateToProps, { onFieldChange, onSubmit, onUnload })(Register)
);
