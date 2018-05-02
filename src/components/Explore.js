import React, { Component } from "react";
import Navigation from './Navigation';
import ProjectList from './ProjectList';

class Explore extends Component {
  render() {
    return (
      <div className="explore">
        <Navigation />
        <Footer />
      </div>
    );
  }
}

function Footer(props) {
  return <div className="footer" />;
}

export default Explore;