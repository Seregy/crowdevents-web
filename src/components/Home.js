import React, { Component } from "react";
import Navigation from "./Navigation";
import ProjectList from "./ProjectList";
import Footer from "./Footer";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Navigation />
        <ProjectList />
        <Footer />
      </div>
    );
  }
}

export default Home;
