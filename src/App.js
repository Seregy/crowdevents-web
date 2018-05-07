import React, { Component } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Navigation />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
