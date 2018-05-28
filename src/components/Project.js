import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import getSymbolFromCurrency from "currency-symbol-map";
import Geocode from "react-geocode";

import ProjectDetails from "./ProjectDetails";
import ProjectGallery from "./ProjectGallery";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faHeart from "@fortawesome/fontawesome-free-regular/faHeart";
import faLink from "@fortawesome/fontawesome-free-solid/faLink";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";
import faTag from "@fortawesome/fontawesome-free-solid/faTag";
import faMapMarkerAlt from "@fortawesome/fontawesome-free-solid/faMapMarkerAlt";
import faCalendarAlt from "@fortawesome/fontawesome-free-regular/faCalendarAlt";

import "../css/Project.css";

import avatarPlaceholder from "../image/avatar_placeholder.png";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isProjectLoaded: false,
      isLocationLoaded: false,
      project: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8080/v0/projects/" + this.props.match.params.id, {
        crossdomain: true
      })
      .then(
        result => {
          this.setState({
            isProjectLoaded: true,
            project: result.data
          });
        },
        error => {
          this.setState({
            isProjectLoaded: true,
            error
          });
        }
      )
      .then(() =>
        Geocode.fromLatLng(
          this.state.project.location.latitude,
          this.state.project.location.longitude
        )
      )
      .then(
        response => {
          console.log(response);
          const postalCode = response.results[0].address_components.filter(
            component => component.types.includes("postal_code")
          );
          let addressWithoutPostalCode = response.results[0].formatted_address;
          if (postalCode.length > 0) {
            addressWithoutPostalCode = addressWithoutPostalCode.replace(
              " " + postalCode[0].long_name,
              ""
            );
          }

          const location = this.state.project.location;
          location.formatted_address = addressWithoutPostalCode;

          this.setState({
            isLocationLoaded: true,
            projectLocation: location
          });
        },
        error => {
          isLocationLoaded: true, error;
        }
      );
  }

  render() {
    const { project, projectLocation, error, isProjectLoaded } = this.state;

    const videos = project.gallery_videos || [];
    const images = project.gallery_images || [];

    if (!videos.length && !images.length) {
      images.push(project.project_image);
    }

    const eventDate = moment(project.event_date);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isProjectLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="project">
          <ProjectHeader project={project} />
          <div className="row">
            <div className="col-8">
              <ProjectGallery images={images} videos={videos} />
              <ProjectFooter
                eventDate={eventDate}
                projectAddress={projectLocation}
              />
            </div>
            <div className="col-4">
              <ProjectSideInfo project={project} />
            </div>
          </div>
          <div className="project-details row">
            <div className="col-8">
              <ProjectDetails
                project={project}
                currentTab={this.props.match.params.tab}
              />
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
      <div className="text-muted p-1 flex-fill">
        {project.short_description}
      </div>
    </div>
  );
}

function ProjectFooter(props) {
  return (
    <div className="d-flex">
      <ProjectDate date={props.eventDate} />
      {props.projectAddress ? (
        <ProjectAddress address={props.projectAddress} />
      ) : null}
    </div>
  );
}

function ProjectDate(props) {
  const formattedDate = props.date.format("dddd, MMMM Do, hh:mm");
  const isoDate = props.date.toISOString();

  return (
    <div className="mr-auto">
      <Link to={"/date/" + isoDate} className="event-date">
        <FontAwesomeIcon className="date-icon" icon={faCalendarAlt} />{" "}
        {formattedDate}
      </Link>
    </div>
  );
}

function ProjectAddress(props) {
  const formattedAddress = props.address.formatted_address;
  const latitude = props.address.latitude;
  const longitude = props.address.longitude;

  return (
    <div className="ml-auto">
      <Link to={"/place/" + latitude + "," + longitude} className="location">
        <FontAwesomeIcon className="location-icon" icon={faMapMarkerAlt} />{" "}
        {formattedAddress}
      </Link>
    </div>
  );
}

function ProjectSideInfo(props) {
  const project = props.project;

  const raised = project.raised || { amount: 0 };

  const categories = project.categories || [];

  const fundingGoal = project.funding_goal || { amount: 1 };
  const progress = Math.floor(raised.amount / fundingGoal.amount * 100);
  const timeLeft = moment
    .duration(moment(project.ends).diff(new moment()))
    .format();

  const owner = project.owner;
  const ownerImage = owner.image_link || avatarPlaceholder;

  return (
    <div className="project-info px-2 d-flex flex-column flex-fill text-left">
      <div className="project-owner info-block d-flex">
      <Link className="image-link" to={"person/" + owner.id}>
            <img className="image" src={ownerImage} />
          </Link>
          <div className="d-flex flex-column pl-3">
            <Link className="owner-link" to={"person/" + owner.id}>
              {owner.name} {owner.surname ? owner.surname : ""}
            </Link>
            <div className="text-muted">Project owner</div>
          </div>
      </div>
      <div className="info-block progress">
        <div
          className="progress-bar"
          style={{ width: progress + "%" }}
          role="progressbar"
          aria-valuenow={raised.amount}
          aria-valuemin="0"
          aria-valuemax={fundingGoal.amount}
        />
      </div>
      <div className="info-block">
        <span className="primary text-primary">
          {raised.amount + "" + getSymbolFromCurrency(raised.currency)}{" "}
        </span>
        <span className="">{raised.currency} raised</span>
        <div className="text-muted">
          {progress}% of{" "}
          {fundingGoal.amount +
            "" +
            getSymbolFromCurrency(fundingGoal.currency)}
        </div>
      </div>
      <div className="info-block">
        <span className="primary">{project.contributions.length}</span>
        <div className="text-muted">contributors</div>
      </div>
      <div className="info-block">
        <span className="primary">{timeLeft}</span>
        <div className="text-muted">left</div>
      </div>
      <div className="info-block contribute">
        <Link
          to={"/contribute/" + project.id}
          className="btn btn-primary w-100"
        >
          Contribute to the project
        </Link>
      </div>
      <div className="info-block d-flex">
        {categories.map(category => (
          <Link
            to={"/category/" + category.id}
            className="category mr-3"
            key={category.id}
          >
            <FontAwesomeIcon className="category-icon" icon={faTag} />{" "}
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Project;
