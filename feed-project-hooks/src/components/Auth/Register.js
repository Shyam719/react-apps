import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../../utils/context";
import agent from "../../utils/agent";
import * as ACTIONTYPES from "../../store/actions/actionTypes";
import history from "../../utils/history";
import ListErrors from "../ListErrors";

export const Register = () => {
  const { state, dispatch } = React.useContext(Context);
  const initialState = {
    email: "shyam11@gmail.com",
    password: "shyam111",
    username: "shyam11",
    isSubmitting: false,
    errors: null,
  };

  const [data, setData] = React.useState(initialState);

  useEffect(() => {
    console.log("use effect");
    console.log(state);
    if (state.isAuthenticated) history.replace(state.redirectTo);

    // componentWillUnmount lifecycle
    return () => {
      //dispatchAuthReducer({ type: ACTIONTYPES.LOGIN_PAGE_UNLOADED });
    };
  }, [state]);

  const handleInputChange = (ev) => {
    setData({
      ...data,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
    });
    const res = await agent.Auth.register(
      data.email,
      data.password,
      data.username
    );
    setData({
      ...data,
      isSubmitting: false,
    });
    if (res.status === 200) {
      dispatch({ type: ACTIONTYPES.REGISTER, payload: res });
    } else {
      setData({
        ...data,
        errors: res.errors.errors,
      });
      dispatch({
        type: ACTIONTYPES.REGISTER,
        payload: res,
        error: true,
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ListErrors errors={data.errors} />

            <form onSubmit={handleFormSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={data.username}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={data.isSubmitting}
                >
                  {data.isSubmitting ? "Submitting..." : "Sign up"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
