import React, { Component } from "react";
import Navigation from './Navigation';
import ProjectList from './ProjectList';

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

function Footer(props) {
  return <div className="footer" />;
}

export default Home;