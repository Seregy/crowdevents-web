import React, { Component } from "react";
import Navigation from './components/Navigation';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';

class Project extends Component {
  render() {
    return (
      <div className="home">
        <Navigation />
        <ProjectDetails id={this.props.match.params.id}/>
        <Footer />
      </div>
    );
  }
}

export default Project;