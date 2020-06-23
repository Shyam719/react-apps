import React, { Fragment, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Context from "../../utils/context";
import { LOGOUT, MY_POSTS } from "../../store/actions/actionTypes";
import history from "../../utils/history";
import "./Header.scss";

const LoggedInView = (props) => {
  const { t } = useTranslation();
  if (props.currentUser) {
    const clickHandler = (ev, action) => {
      ev.preventDefault();
      props.onMenuAction(action);
    };
    return (
      <Fragment>
        <li className="nav-item">
          <Link to="/article" className="nav-link">
            {t("header.menu.newpost")}
          </Link>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <span
              className="nav-link dropdown-toggle btn btn-light"
              data-toggle="dropdown"
            >
              {t("header.welcome", { username: props.currentUser.username })}
            </span>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/posts">
                My Posts
              </Link>
              <Link
                className="dropdown-item"
                onClick={(ev) => clickHandler(ev, "logout")}
              >
                Logout
              </Link>
            </div>
          </div>
        </li>
      </Fragment>
    );
  }
  return null;
};

const LoggedOutView = (props) => {
  const { t } = useTranslation();
  if (!props.currentUser) {
    return (
      <Fragment>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            {t("header.menu.signin")}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            {t("header.menu.signup")}
          </Link>
        </li>
      </Fragment>
    );
  }
  return null;
};

export const Header = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    console.log("use effect");
    console.log(state);
    if (state.redirectTo) history.replace(state.redirectTo);
  }, [state]);

  const { t, i18n } = useTranslation();
  const href = "#";
  const changeLanguage = (ev, language) => {
    ev.preventDefault();
    i18n.changeLanguage(language);
  };
  const changeTheme = (ev, theme) => {
    ev.preventDefault();
    const domELe = document.querySelector("body");
    domELe.classList = [];
    domELe.classList.add(theme);
  };
  const onMenuAction = (action) => {
    switch (action) {
      case "logout":
        dispatch({ type: LOGOUT });
        break;
      case "posts":
        dispatch({ type: MY_POSTS });
        break;
      default:
        return null;
    }
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light header">
      <span className="navbar-brand" href="#">
        {t("header.appName")}
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {t("header.menu.home")}
            </Link>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <Link
                to="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle"
              >
                {t("header.language")}
              </Link>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  href={href}
                  onClick={(ev) => changeLanguage(ev, "en")}
                >
                  English
                </a>
                <a
                  className="dropdown-item"
                  href={href}
                  onClick={(ev) => changeLanguage(ev, "du")}
                >
                  Dutch
                </a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <Link
                to="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle"
              >
                {t("header.theme")}
              </Link>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  href={href}
                  onClick={(ev) => changeTheme(ev, "theme-default")}
                >
                  Default
                </a>
                <a
                  className="dropdown-item"
                  href={href}
                  onClick={(ev) => changeTheme(ev, "theme-light")}
                >
                  Light
                </a>
                <a
                  className="dropdown-item"
                  href={href}
                  onClick={(ev) => changeTheme(ev, "theme-dark")}
                >
                  Dark
                </a>
              </div>
            </div>
          </li>

          <LoggedOutView currentUser={state.currentUser} />

          <LoggedInView
            currentUser={state.currentUser}
            onMenuAction={onMenuAction}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
