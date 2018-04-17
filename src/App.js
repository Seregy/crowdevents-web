import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from 'axios';

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Crowdevents
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
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
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
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      projects: []
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8080/projects", { crossdomain: true }).then(
      result => {
        this.setState({
          isLoaded: true,
          projects: result.data.content
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, projects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const rows = chunkArrayInGroups(projects, 3);

      return (
        rows.map(row => (
          <div className="row">
          <div className="card-deck">
          {row.map(project => (
              <div
                key={project.id}
                className="card"
                style={{ width: 18 + "rem" }}
              >
                <img
                  className="card-img-top"
                  src=".../100px180/"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        ))
      );
    }
  }
}

function Footer(props) {
  return <div className="footer" />;
}

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

export default App;
