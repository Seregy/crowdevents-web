import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import { getCurrentUser } from "../utils/Oauth";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

import "../css/Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          MeetIn
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <NavItemLink path="/">
              <FormattedMessage
                id="app.navigation.home"
                defaultMessage="Home"
              />
            </NavItemLink>
            <NavItemLink path="/explore">
              <FormattedMessage
                id="app.navigation.explore"
                defaultMessage="Explore"
              />
            </NavItemLink>
            <NavItemLink path="/create">
              <FormattedMessage
                id="app.navigation.create"
                defaultMessage="Create"
              />
            </NavItemLink>
          </ul>
          <ul className="navbar-nav">
            <button className="nav-item ml-auto btn btn-link nav-link">
              <FormattedMessage
                id="app.navigation.search"
                defaultMessage="Search"
              />
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
            </button>
            <ProfileLink />
          </ul>
        </div>
      </nav>
    );
  }
}

function ProfileLink(props) {
  const user = getCurrentUser();

  if (!user) {
    return (
      <NavItemLink path="/login">
        <FormattedMessage
          id="app.navigation.login"
          defaultMessage="Login"
        />
      </NavItemLink>
    );
  } else {
    return (
      <div className="profile nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          {user.name}
        </a>
        <div className="dropdown-menu">
          <Link to="/me" className="dropdown-item">
            <FormattedMessage
              id="app.navigation.profile"
              defaultMessage="Profile"
            />
          </Link>
          <Link to="/me" className="dropdown-item">
            <FormattedMessage
              id="app.navigation.settings"
              defaultMessage="Settings"
            />
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="/logout" className="dropdown-item">
            <FormattedMessage
              id="app.navigation.logout"
              defaultMessage="Logout"
            />
          </Link>
        </div>
      </div>
    );
  }
}

function NavItemLink(props) {
  const pageURI = window.location.pathname + window.location.search;
  const liClassName = props.path === pageURI ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
  const currentTag = props.path === pageURI ? (<span className="sr-only">(current)</span>) : ("");
  return (
    <li className={liClassName}>
      <Link to={props.path} className={aClassName}>
        {props.children}
        {currentTag}
      </Link>
    </li>
  );
}

export default Navigation;
