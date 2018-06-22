import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import Explore from "./Explore";
import Project from "./Project";
import UserProfile from "./UserProfile";
import Login from "./Login";
import Logout from "./Logout";

import { isOauthTokenExpired } from "../utils/Oauth";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/project/:id/:tab?" component={Project} />
        <Route exact path="/me" render={() => (
          this.isLoggedIn() ? (<UserProfile />) : (<Redirect to="/login" />)
        )} />
        <Route exact path="/login" render={() => (
          !this.isLoggedIn() ? (<Login />) : (<Redirect to="/me" />)
        )} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    );
  }

  isLoggedIn() {
    return !isOauthTokenExpired();
  }
}

export default Main;
