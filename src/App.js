import React, { Component } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
  }

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
