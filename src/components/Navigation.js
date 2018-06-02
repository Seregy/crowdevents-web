import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

import "../css/Navigation.css";

class Navigation extends Component {
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
            <NavItemLink path="/login">
              <FormattedMessage
                id="app.navigation.login"
                defaultMessage="Login"
              />
            </NavItemLink>
          </ul>
        </div>
      </nav>
    );
  }
}

function NavItemLink(props) {
  const pageURI = window.location.pathname + window.location.search;
  const liClassName = props.path === pageURI ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
  const currentTag = props.path === pageURI ? ( <span className="sr-only">(current)</span> ) : ("");
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
