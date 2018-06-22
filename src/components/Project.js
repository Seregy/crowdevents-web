import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import humanizeDuration from "humanize-duration";
import getSymbolFromCurrency from "currency-symbol-map";
import loadGoogleMapsApi from "load-google-maps-api";
import { FormattedMessage, FormattedDate } from 'react-intl';
import { injectIntl } from 'react-intl';

import ProjectDetails from "./ProjectDetails";
import ProjectGallery from "./ProjectGallery";
import ProjectRewards from "./ProjectRewards";

import "moment/locale/uk";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTag from "@fortawesome/fontawesome-free-solid/faTag";
import faMapMarkerAlt from "@fortawesome/fontawesome-free-solid/faMapMarkerAlt";
import faCalendarAlt from "@fortawesome/fontawesome-free-regular/faCalendarAlt";

import "../css/Project.css";

import avatarPlaceholder from "../image/avatar_placeholder.png";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: props.intl.locale,
      error: null,
      isProjectLoaded: false,
      isLocationLoaded: false,
      project: {},
      geocoder: null
    };
  }

  componentDidMount() {
    moment.locale(this.state.locale);

    const loadGoogleApi = loadGoogleMapsApi({
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      language: this.state.locale
    })

    loadGoogleApi.then(googleMaps => {
      const geocoder = promisifyGeocoder(new googleMaps.Geocoder());
      this.setState({
        geocoder: geocoder
      });

    });

    const loadProject = axios.get("http://127.0.0.1:8080/v0/projects/" + this.props.match.params.id, {
      crossdomain: true
    });

    loadProject.then(
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
    );

    Promise.all([loadGoogleApi, loadProject]).then(() => {
      const request = {
        location: {
          lat: this.state.project.location.latitude,
          lng: this.state.project.location.longitude
        }
      }
      return this.state.geocoder.geocode(request);
    }).then(results => {
      const postalCode = results[0].address_components.filter(
        component => component.types.includes("postal_code")
      );
      let addressWithoutPostalCode = results[0].formatted_address;
      if (postalCode.length > 0) {
        addressWithoutPostalCode = addressWithoutPostalCode.replace(
          " " + postalCode[0].long_name,
          ""
        );
        addressWithoutPostalCode = addressWithoutPostalCode.replace(/,+$/, "")
      }

      const location = this.state.project.location;
      location.formatted_address = addressWithoutPostalCode;

      this.setState({
        isLocationLoaded: true,
        projectLocation: location
      });
    }).catch(error => {
      isLocationLoaded: true, error;
    })
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
      return (
        <div>
          <FormattedMessage
            id="app.load.error"
            defaultMessage="Error: {errorMessage}"
            values={{
              errorMessage: error.message
            }}
          />
        </div>
      );
    } else if (!isProjectLoaded) {
      return (
        <div>
          <FormattedMessage
            id="app.load.inProgress"
            defaultMessage="Loading..."
          />
        </div>);
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
              <ProjectSideInfo project={project} locale={this.state.locale} />
            </div>
          </div>
          <div className="project-details row">
            <div className="col-8">
              <ProjectDetails
                project={project}
                currentTab={this.props.match.params.tab}
              />
            </div>
            <div className="col-4">
              <ProjectRewards project={project} />
            </div>
          </div>
        </div>
      );
    }
  }
}

function promisifyGeocoder(geocoder) {
  const oldGeocode = geocoder.geocode;
  geocoder.geocode = request => {
    return new Promise((resolve, reject) => {
      oldGeocode(request, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      })
    });
  }
  return geocoder;
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
  const date = props.date;
  const isoDate = date.toISOString();

  return (
    <div className="mr-auto">
      <Link to={"/date/" + isoDate} className="event-date">
        <FontAwesomeIcon className="date-icon" icon={faCalendarAlt} />{" "}
        <FormattedDate value={date} weekday='long' year='numeric' month='long' day='numeric' hour='2-digit' minute='2-digit' />
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

class ProjectSideInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      locale: props.locale
    };
  }

  componentDidMount() {
    moment.locale(this.state.locale);
  }

  render() {
    const project = this.state.project;
    const raised = project.raised || { amount: 0 };

    const categories = project.categories || [];

    const fundingGoal = project.funding_goal || { amount: 1 };
    const progress = Math.floor(raised.amount / fundingGoal.amount * 100);

    const timeLeft = humanizeDuration(moment.duration(moment(project.ends).diff(new moment())),
      { language: this.state.locale, largest: 2, round: true });

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
            <div className="text-muted">
              <FormattedMessage
                id="app.project.owner"
                defaultMessage="Project owner"
              />
            </div>
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
            <FormattedMessage
              id="app.project.raised.amountWithSymbol"
              defaultMessage="{currencySymbol}{amount}"
              values={{
                amount: raised.amount,
                currencySymbol: getSymbolFromCurrency(raised.currency)
              }}
            />
          </span>
          {" "}
          <FormattedMessage
            id="app.project.raised.text"
            defaultMessage="{currency} raised"
            values={{
              currency: raised.currency
            }}
          />
          <div className="text-muted">
            <FormattedMessage
              id="app.project.raised.percentage"
              defaultMessage="{percent}% of {currencySymbol}{amount}"
              values={{
                percent: progress,
                amount: fundingGoal.amount,
                currencySymbol: getSymbolFromCurrency(fundingGoal.currency)
              }}
            />
          </div>
        </div>
        <div className="info-block">
          <span className="primary">{project.contributions.length}</span>
          <div className="text-muted">
            <FormattedMessage
              id="app.project.contributors"
              defaultMessage={`{amount, plural,
                one {contributor}
                many {contributors}
              }`}
              values={{
                amount: project.contributions.length
              }}
            />
          </div>
        </div>
        <div className="info-block">
          <span className="primary">{timeLeft}</span>
          <div className="text-muted">
            <FormattedMessage
              id="app.project.timeLeft"
              defaultMessage="left"
            />
          </div>
        </div>
        <div className="info-block contribute">
          <Link
            to={"/contribute/" + project.id}
            className="btn btn-primary w-100"
          >
            <FormattedMessage
              id="app.project.contribute"
              defaultMessage="Contribute"
            />
          </Link>
        </div>
        <div className="info-block d-flex">
          {categories.map(category => (
            <Link
              to={"/category/" + category.id}
              className="category mr-3"
              key={category.id}
            >
              <FontAwesomeIcon className="category-icon" icon={faTag} />
              {" "}
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default injectIntl(Project);
