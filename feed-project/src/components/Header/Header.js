import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { LOGOUT, MY_POSTS } from "../../constants/actionTypes";
import { connect } from "react-redux";
import { useTranslation, withTranslation } from "react-i18next";

const LoggedInView = (props) => {
  const { t } = useTranslation();
  if (props.currentUser) {
    const clickHandler = (ev, action) => {
      ev.preventDefault();
      props.onMenuAction(action);
    };
    let href = "#";
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
              <a
                className="dropdown-item"
                href={href}
                onClick={(ev) => clickHandler(ev, "posts")}
              >
                My Posts
              </a>
              <a
                className="dropdown-item"
                href={href}
                onClick={(ev) => clickHandler(ev, "logout")}
              >
                Logout
              </a>
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

const mapStateToProps = (state) => ({
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onMenuAction: (action) => {
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
  },
});

class Header extends React.Component {
  render() {
    const { t, i18n } = this.props;
    const href = "#";
    const changeLanguage = (ev, language) => {
      ev.preventDefault();
      i18n.changeLanguage(language);
    };
    return (
      <nav className="navbar navbar-expand-sm navbar-light">
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

            <LoggedOutView currentUser={this.props.currentUser} />

            <LoggedInView
              currentUser={this.props.currentUser}
              onMenuAction={this.props.onMenuAction}
            />
          </ul>
        </div>
      </nav>
    );
  }
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
