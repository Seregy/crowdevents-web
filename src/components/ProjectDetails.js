import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map'
import Geocode from "react-geocode";

import ProjectGallery from './ProjectGallery';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-regular/faHeart';
import faLink from '@fortawesome/fontawesome-free-solid/faLink';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faTag from '@fortawesome/fontawesome-free-solid/faTag';
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';
import faCalendarAlt from '@fortawesome/fontawesome-free-regular/faCalendarAlt';

import '../css/ProjectDetails.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      project: {}
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8080/v0/projects/" + this.props.id, { crossdomain: true }).then(
      result => {
        this.setState({
          isLoaded: true,
          project: result.data
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    ).then(() => Geocode.fromLatLng(this.state.project.location.latitude, this.state.project.location.longitude))
    .then(
      response => {
        const postalCode = ' ' + response.results[0].address_components.filter(component => component.types.includes('postal_code'))[0].long_name;
        const addressWithoutPostalCode = response.results[0].formatted_address.replace(postalCode, '');

        this.setState({
          projectAddress: addressWithoutPostalCode,
        });
      },
      error => {
        projectAddress: error
      })
  }

  render() {
    const { project } = this.state;
    const { error, isLoaded, projects } = this.state;

    const videos = project.gallery_videos || []
    const images = project.gallery_images || []

    if (!videos.length && !images.length) {
      images.push(project.project_image);
    }

    const raised = project.raised || {amount: 0};

    const categories = project.categories || [];

    const eventDate = project.event_date || moment('2018-07-26T02:17:47').format('dddd, MMMM Do, hh:mm');

    const fundingGoal = (project.funding_goal ? project.funding_goal.amount : 1);
    const progress = Math.floor(raised.amount / fundingGoal * 100);
    const timeLeft = moment
                      .duration(moment(project.ends).diff(new moment()))
                      .format();

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="project-details">
          <ProjectHeader project={project}/>
          <div className="row">
            <div className="col-8">
              <ProjectGallery images={images} videos={videos}/>
              <div className="d-flex">
                <div className="">
                  <Link to={"/date/" + eventDate} className="event-date mr-3"><FontAwesomeIcon className="date-icon" icon={faCalendarAlt}/> {eventDate}</Link>
                </div>
                <div className="ml-auto">
                <Link to={"/place/" + this.state.projectAddress} className="location mr-3"><FontAwesomeIcon className="location-icon" icon={faMapMarkerAlt}/> {this.state.projectAddress}</Link>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="project-info p-2 d-flex flex-column text-left">
                <div className="progress mt-auto">
                    <div className="progress-bar" style={{width: progress + '%'}} role="progressbar" aria-valuenow={project.raised.amount} aria-valuemin="0"
                      aria-valuemax={fundingGoal}></div>
                </div>
                <div className="info-block pb-3">
                  <span className="primary text-primary">{project.raised.amount + "" + getSymbolFromCurrency(project.raised.currency)} </span>
                  <span className="">{project.raised.currency} raised</span>
                  <div className="text-muted">{progress}% of {fundingGoal + "" + getSymbolFromCurrency(project.funding_goal.currency)}</div>
                </div>
                <div className="info-block pb-3">
                  <span className="primary">{project.contributions.length}</span>
                  <div className="text-muted">contributors</div>
                </div>
                <div className="info-block pb-3">
                  <span className="primary">{timeLeft}</span>
                  <div className="text-muted">left</div>
                </div>
                <div className="info-block contribute">
                  <Link to="/contribute" className="btn btn-primary w-100">Contribute to the project</Link>
                </div>

                <div className="info-block d-flex">
                  {categories.map((category) => (
                    <Link to={"/category/" + category.id} className="category mr-3" key={category.id}><FontAwesomeIcon className="category-icon" icon={faTag}/> {category.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function ProjectHeader(props) {
  const project = props.project;

  return (
    <div className="header row mb-4 d-flex flex-column">
      <h2 className="p-1 flex-fill">{project.name}</h2>
      <div className="text-muted p-1 flex-fill">{project.short_description}</div>
    </div>
  );
}

export default Project;