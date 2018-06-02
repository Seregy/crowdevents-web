import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import humanizeDuration from "humanize-duration";
import momentDurationFormatSetup from "moment-duration-format";
import getSymbolFromCurrency from "currency-symbol-map";
import { FormattedMessage, FormattedDate, FormattedNumber, FormattedRelative } from 'react-intl';
import { injectIntl } from 'react-intl';

import FollowIcon from "./FollowIcon";

import placeholderImage from "../image/placeholder.jpg";

import "../css/ProjectList.css";

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      locale: props.locale
    };
  }

  render() {
    momentDurationFormatSetup(moment);
    const project = this.state.project;
    const image = project.project_image || placeholderImage;
    const fundingGoal = project.funding_goal ? project.funding_goal.amount : 1;
    const progress = Math.floor(project.raised.amount / fundingGoal * 100);
    const timeLeft = humanizeDuration(moment.duration(moment(project.ends).diff(new moment())),
      { language: this.state.locale, largest: 2, round: true });

    return (
      <div className="project-card card my-3">
        <div className="project-img-wrapper">
          <Link className="card-title-link" to={"/project/" + project.id}>
            <img className="project-img card-img-top" src={image} alt="" />
          </Link>
          {/* <span className="project-follow-icon fa-layers fa-fw">
          <FontAwesomeIcon className="circle-icon" icon={faCircle} transform="inverse grow-12" />
          <Link to="/"><FontAwesomeIcon className="heart-icon" icon={faHeart}/></Link>
        </span> */}
          <FollowIcon />
        </div>
        <div className="card-body">
          <Link className="card-title-link" to={"/project/" + project.id}>
            <h5 className="card-title">{project.name}</h5>
          </Link>
          <p className="project-short-description card-text text-secondary">
            {project.short_description}
          </p>
        </div>
        <div className="project-funding-progress card-body d-flex flex-column">
          <div className="d-flex">
            <div className="p-1">
              <span className="font-weight-bold">
                <FormattedMessage
                  id="app.project.raised.amountWithSymbol"
                  defaultMessage="{currencySymbol}{amount}"
                  values={{
                    amount: project.raised.amount,
                    currencySymbol: getSymbolFromCurrency(project.raised.currency)
                  }}
                />
              </span>
            </div>
            <div className="p-1 mr-auto">
              <small className="text-muted">
                <FormattedMessage
                  id="app.project.raised.text"
                  defaultMessage="{currency} raised"
                  values={{
                    currency: project.raised.currency
                  }}
                />
              </small>
            </div>
            <div className="p-1 ml-auto">
              <FormattedNumber value={progress / 100} style="percent" />
            </div>
          </div>
          <div className="progress mt-auto">
            <div
              className="progress-bar"
              style={{ width: progress + "%" }}
              role="progressbar"
              aria-valuenow={project.raised.amount}
              aria-valuemin="0"
              aria-valuemax={fundingGoal}
            />
          </div>
          <small className="project-time-left p-1 text-muted">
            {timeLeft}
            {" "}
            <FormattedMessage
              id="app.project.timeLeft"
              defaultMessage="left"
            />
          </small>
        </div>
      </div>
    );
  }
}

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: props.intl.locale,
      error: null,
      isLoaded: false,
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8080/v0/projects?limit=12", { crossdomain: true })
      .then(
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
    } else if (!isLoaded) {
      return (
        <div>
          <FormattedMessage
            id="app.load.inProgress"
            defaultMessage="Loading..."
          />
        </div>);
    } else {
      const rows = chunkArrayInGroups(projects, 3);

      return rows.map(row => (
        <div className="row">
          <div className="card-deck col-12">
            {row.map(project => (
              <ProjectCard project={project} key={project.id} locale={this.state.locale} />
            ))}
          </div>
        </div>
      ));
    }
  }
}

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

export default injectIntl(ProjectList);
