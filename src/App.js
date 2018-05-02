import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Navigation from './components/Navigation';
import ProjectList from './components/ProjectList';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navigation />
        <ProjectList />
        <Footer />
      </div>
    );
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
