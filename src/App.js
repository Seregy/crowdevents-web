import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ProjectList />
        <Footer />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Crowdevents
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Explore
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Create a project
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class ProjectList extends Component {
  render() {
    return <p>List of projects</p>;
  }
}

function Footer(props) {
  return <div className="footer" />;
}

export default App;
