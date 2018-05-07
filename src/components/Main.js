import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Explore from "./Explore";
import Project from "./Project";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/project/:id/:tab?" component={Project} />
      </Switch>
    );
  }
}

export default Main;
