import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import Explore from "./Explore";
import Project from "./Project";
import UserProfile from "./UserProfile";
import Login from "./Login";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/project/:id/:tab?" component={Project} />
        <Route path="/login" component={Login} />
        <Route exact path="/me" render={() => (
          isLoggedIn() ? (<UserProfile />) : (<Redirect to="/login"/>)
        )} />
      </Switch>
    );
  }
}

function isLoggedIn() {
  return false;
}

export default Main;
