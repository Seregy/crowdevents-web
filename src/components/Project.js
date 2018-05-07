import React, { Component } from "react";
import ProjectDetails from "./ProjectDetails";

class Project extends Component {
  render() {
    return (
      <ProjectDetails id={this.props.match.params.id} currentTab={this.props.match.params.tab} />
    );
  }
}

export default Project;
