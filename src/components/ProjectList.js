import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

import getSymbolFromCurrency from 'currency-symbol-map'
import placeholderImage from "../image/placeholder.jpg";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-regular/faHeart';
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle';

import '../css/ProjectList.css';

class ProjectCard extends Component { 
  render() {
    const project = this.props.project;
    const image = project.project_image || placeholderImage;
    const fundingGoal = (project.funding_goal ? project.funding_goal.amount : 1);
    const progress = Math.floor(project.raised.amount / fundingGoal * 100);
    const timeLeft = moment(project.ends).diff(new moment(), 'days');

    return (
      <div className="project-card card my-3">
        <div className="project-img-wrapper">
          <Link className="card-title-link" to={"/project/" + project.id}>
            <img className="project-img card-img-top" src={image} alt=""/>
          </Link>
        <span className="project-follow-icon fa-layers fa-fw">
          <FontAwesomeIcon className="circle-icon" icon={faCircle} transform="inverse grow-12" />
          <Link to="/"><FontAwesomeIcon className="heart-icon" icon={faHeart}/></Link>
        </span>
        </div>
          <div className="card-body">
            <Link className="card-title-link" to={"/project/" + project.id}>
              <h5 className="card-title">{project.name}</h5>
            </Link>
            <p className="project-short-description card-text text-secondary">{project.short_description}</p>
          </div>
          <div className="project-funding-progress card-body d-flex flex-column">
            <div className="d-flex">
              <div className="p-1">
                <span className="font-weight-bold">{project.raised.amount + "" + getSymbolFromCurrency(project.raised.currency)}</span> 
              </div>
              <div className="p-1 mr-auto"><small className="text-muted">{project.raised.currency} raised</small></div>
              <div className="p-1 ml-auto">{progress}%</div>
            </div>
            <div className="progress mt-auto">
              <div className="progress-bar" style={{width: progress + '%'}} role="progressbar" aria-valuenow={project.raised.amount} aria-valuemin="0"
                aria-valuemax={fundingGoal}></div>
            </div>
            <small className="project-time-left p-1 text-muted">{timeLeft} days left</small>
          </div>
      </div>
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
    axios.get("http://127.0.0.1:8080/v0/projects?limit=12", { crossdomain: true }).then(
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
              <ProjectCard project={project} key={project.id} />))}
          </div>
        </div>
        ))
      );
    }
  }
}

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

export default ProjectList;