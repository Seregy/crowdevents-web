import React, { Component } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Home from "./components/Home";
import Explore from "./components/Explore";
import Project from "./Project";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route exact path="/" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/project/:id" component={Project} />
      </div>
    );
  }
}

export default App;
