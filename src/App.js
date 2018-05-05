import React, { Component } from "react";
import { Route } from 'react-router-dom'
import logo from "./logo.svg";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Home from './components/Home';
import Explore from './components/Explore';
import Project from './components/Project';

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

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

export default App;
