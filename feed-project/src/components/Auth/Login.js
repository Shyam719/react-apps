import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  LOGIN,
  UPDATE_FIELD_AUTH,
  LOGIN_PAGE_UNLOADED,
  ASYNC_START,
  ASYNC_END,
} from "../../constants/actionTypes";
import { connect } from "react-redux";
import agent from "../../agent";
import Loader from "../Loader";
import ListErrors from "../ListErrors";

const mapStateToProps = (state) => {
  if (state.auth) {
    state.auth.email = state.auth.email
      ? state.auth.email
      : "shyam11@gmail.com";
    state.auth.password = state.auth.password
      ? state.auth.password
      : "shyam111";
  }
  return { ...state.auth, loading: state.common.loading };
};

const onFieldChange = (key, value) => (dispatch) =>
  dispatch({ type: UPDATE_FIELD_AUTH, key, value });
const onSubmit = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_START, subtype: LOGIN });
    const res = await agent.Auth.login(email, password);
    if (res.status === 200) {
      dispatch({ type: LOGIN, payload: res });
      dispatch({ type: ASYNC_END, payload: res });
    } else {
      dispatch({ type: LOGIN, payload: res, error: true });
      dispatch({ type: ASYNC_END, payload: res });
    }
  };
};
const onUnload = () => (dispatch) => dispatch({ type: LOGIN_PAGE_UNLOADED });

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onFieldChange = (key, value) => this.props.onFieldChange(key, value);
    this.submitForm = (email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderDisplay() {
    const { email, password } = this.props;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>
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
                    disabled={this.props.loading}
                  >
                    Sign in
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

export default connect(mapStateToProps, { onFieldChange, onSubmit, onUnload })(
  Login
);
