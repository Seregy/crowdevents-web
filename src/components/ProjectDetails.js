import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FormattedMessage, FormattedDate, FormattedRelative } from 'react-intl';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faHeart from "@fortawesome/fontawesome-free-regular/faHeart";
import faLink from "@fortawesome/fontawesome-free-solid/faLink";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";
import faTag from "@fortawesome/fontawesome-free-solid/faTag";
import faMapMarkerAlt from "@fortawesome/fontawesome-free-solid/faMapMarkerAlt";
import faCalendarAlt from "@fortawesome/fontawesome-free-regular/faCalendarAlt";
import faCaretRight from "@fortawesome/fontawesome-free-solid/faCaretRight";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";

import "../css/ProjectDetails.css";

import avatarPlaceholder from "../image/avatar_placeholder.png";

function ProjectDetails(props) {
  let currentTab = "description";
  if (props.currentTab === "faq") {
    currentTab = "faq";
  } else if (props.currentTab === "updates") {
    currentTab = "updates";
  } else if (props.currentTab === "comments") {
    currentTab = "comments";
  }

  return (
    <div className="project-details">
      <ProjectNavigation active={currentTab} project={props.project} />
      <ProjectTabs tab={currentTab} project={props.project} />
    </div>
  );
}

function ProjectNavigation(props) {
  const projectId = props.project.id;

  const commentsEnabled = props.project.comments.length > 0;
  const faqEnabled = props.project.faqs.length > 0;
  const updatesEnabled = props.project.updates.length > 0;

  let descriptionLink = "/project/" + projectId;
  let faqLink = "/project/" + projectId + "/faq";
  let updatesLink = "/project/" + projectId + "/updates"
  let commentsLink = "/project/" + projectId + "/comments";

  return (
    <ul className="nav nav-tabs">
      <ProjectNavItem link={descriptionLink} active={props.active === "description"} enabled={true}>
        <FormattedMessage
          id="app.project.tabs.description"
          defaultMessage="Description"
        />
      </ProjectNavItem>
      <ProjectNavItem link={faqLink} active={props.active === "faq"} enabled={faqEnabled}>
        <FormattedMessage
          id="app.project.tabs.faq"
          defaultMessage="FAQ"
        />
      </ProjectNavItem>
      <ProjectNavItem link={updatesLink} active={props.active === "updates"} enabled={updatesEnabled}>
        <FormattedMessage
          id="app.project.tabs.updates"
          defaultMessage="Updates"
        />
      </ProjectNavItem>
      <ProjectNavItem link={commentsLink} active={props.active === "comments"} enabled={commentsEnabled}>
        <FormattedMessage
          id="app.project.tabs.comments"
          defaultMessage="Comments"
        />
      </ProjectNavItem>
    </ul>
  );
}

function ProjectNavItem(props) {
  let link = props.link;
  const active = props.active;
  const enabled = props.enabled;

  const baseItemClass = "nav-item";
  const baseLinkClass = "nav-link";
  const activeClass = "active";
  const disableClass = "disabled";

  let linkClass = baseLinkClass;
  if (active) {
    linkClass = linkClass + " " + activeClass;
  }

  let itemClass = baseItemClass;

  if (enabled) {
    return (
      <li className={itemClass}>
        <Link
          className={linkClass}
          to={link}
        >
          {props.children}
        </Link>
      </li>
    );
  } else {
    return (
      <li className={itemClass}>
        <a
          className={linkClass + " " + disableClass}
        >
          {props.children}
        </a>
      </li>
    );
  }
}

function ProjectTabs(props) {
  if (props.tab === "description") {
    return <DescriptionTab description={props.project.description} />;
  } else if (props.tab === "comments") {
    return <CommentsTab projectId={props.project.id} />;
  } else if (props.tab === "faq") {
    return <FaqsTab projectId={props.project.id} />;
  } else if (props.tab === "updates") {
    return <UpdatesTab projectId={props.project.id} />;
  }
}

function DescriptionTab(props) {
  return <p className="full-description">{props.description}</p>;
}

class CommentsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8080/v0/projects/" +
          this.props.projectId +
          "/comments",
        {
          crossdomain: true
        }
      )
      .then(
        result => {
          this.setState({
            isLoaded: true,
            comments: result.data.content
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
    const { comments, error, isLoaded } = this.state;

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
      return (
        <div>
          {comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }
  }
}

function Comment(props) {
  const comment = props.comment;
  const image = comment.author.image_link || avatarPlaceholder;

  return (
    <div id={comment.id} className="comment row p-3">
      <div className="col-2 text-center">
        <Link className="image-link" to={"/person/" + comment.author.id}>
          <img className="image" src={image} />
        </Link>
      </div>
      <div className="col-10 d-flex flex-column">
        <div className="d-flex">
          <Link className="author-link" to={"/person/" + comment.author.id}>
            {comment.author.name}{" "}
            {comment.author.surname ? comment.author.surname : ""}
          </Link>
          <span className="text-muted pl-2">
            <a className="comment-link" href={"#" + comment.id}>
              <FormattedRelative value={comment.posted}/>
            </a>
          </span>
        </div>

        <p>{comment.message}</p>
      </div>
    </div>
  );
}

class FaqsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      faqs: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8080/v0/projects/" + this.props.projectId + "/faqs",
        {
          crossdomain: true
        }
      )
      .then(
        result => {
          this.setState({
            isLoaded: true,
            faqs: result.data.content
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
    const { faqs, error, isLoaded } = this.state;

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
      return (
        <div className="faqs" id="faqs">
          {faqs.map(faq => <Faq faq={faq} key={faq.id} />)}
        </div>
      );
    }
  }
}

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }));
  }

  render() {
    const faq = this.props.faq;
    const { toggled } = this.state;

    return (
      <div className="faq card">
        <div className="faq-header card-header fa" id={faq.id}>
          <h5 className="mb-0">
            <button
              className="btn-toggle btn btn-link collapsed w-100 d-flex"
              onClick={this.handleClick}
              type="button"
              data-toggle="collapse"
              data-target={"#answer-" + faq.id}
              aria-expanded={toggled}
              aria-controls={"answer-" + faq.id}
            >
              <span>{faq.question}</span>
              <FontAwesomeIcon
                className="ml-auto"
                icon={toggled ? faCaretDown : faCaretRight}
              />
            </button>
          </h5>
        </div>
        <div
          id={"answer-" + faq.id}
          className="collapse"
          aria-labelledby={faq.id}
        >
          <div className="answer card-body">{faq.answer}</div>
        </div>
      </div>
    );
  }
}

class UpdatesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      updates: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8080/v0/projects/" +
          this.props.projectId +
          "/updates",
        {
          crossdomain: true
        }
      )
      .then(
        result => {
          this.setState({
            isLoaded: true,
            updates: result.data.content
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
    const { updates, error, isLoaded } = this.state;
    console.log(updates);

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
      return (
        <div className="updates">
          {updates.map(update => <Update update={update} key={update.id} />)}
        </div>
      );
    }
  }
}

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      readMoreExpanded: false,
      update: {}
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      readMoreExpanded: !prevState.readMoreExpanded
    }));
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8080/v0/updates/" + this.props.update.id, {
        crossdomain: true
      })
      .then(
        result => {
          this.setState({
            isLoaded: true,
            update: result.data
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
    const { readMoreExpanded, isLoaded: isMessageLoaded, error } = this.state;
    const update = this.props.update;

    let readMoreLessText = readMoreExpanded ? "Read less" : "Read more";
    if (readMoreExpanded) {
      readMoreLessText = (
        <FormattedMessage
          id="app.project.tabs.updates.readLess"
          defaultMessage="Read less"
        />
      );
    } else {
      readMoreLessText = (
        <FormattedMessage
          id="app.project.tabs.updates.readMore"
          defaultMessage="Read more"
        />
      );
    }

    return (
      <div className="update card mb-3">
        <div className="card-body">
          <h5 className="update-header card-title">
            {update.title}
          </h5>
          <p className="short-message card-text">
            {update.short_message}
          </p>
          <div className="collapse" id={"update-msg-" + update.id}>
            <p className="full-message card-text">
              {isMessageLoaded ? this.state.update.message || error : "Loading..."}
            </p>
          </div>
          <a className="btn btn-link" onClick={this.handleClick} data-toggle="collapse" href={"#update-msg-" + update.id} role="button" aria-expanded="false" aria-controls={"update-msg-" + update.id}>
            {readMoreLessText}
          </a>
          <p className="card-text d-flex">
            <small className="text-muted">
              <FormattedDate value={update.posted} month='long' day='numeric' hour='2-digit' minute='2-digit' />
            </small>
            <small className="text-muted ml-auto">
              <FormattedRelative value={update.posted}/>
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default ProjectDetails;
