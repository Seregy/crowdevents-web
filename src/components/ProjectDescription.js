import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import "../css/ProjectDescription.css";

import avatarPlaceholder from "../image/avatar_placeholder.png";

function ProjectDescription(props) {
  let currentTab = "description";
  if (props.currentTab === "faq") {
    currentTab = "faq";
  } else if (props.currentTab === "updates") {
    currentTab = "updates";
  } else if (props.currentTab === "comments") {
    currentTab = "comments";
  }

  return (
    <div className="project-description">
      <ProjectNavigation active={currentTab} projectId={props.project.id} />
      <ProjectTabs tab={currentTab} project={props.project} />
    </div>
  );
}

function ProjectNavigation(props) {
  const baseClass = "nav-link";
  const activeClass = " active";
  const descriptionClass =
    baseClass + (props.active === "description" ? activeClass : "");
  const faqClass = baseClass + (props.active === "faq" ? activeClass : "");
  const updatesClass =
    baseClass + (props.active === "updates" ? activeClass : "");
  const commentsClass =
    baseClass + (props.active === "comments" ? activeClass : "");

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className={descriptionClass} to={"/project/" + props.projectId}>
          Description
        </Link>
      </li>
      <li className="nav-item">
        <Link className={faqClass} to={"/project/" + props.projectId + "/faq"}>
          FAQ
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={updatesClass}
          to={"/project/" + props.projectId + "/updates"}
        >
          Updates
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={commentsClass}
          to={"/project/" + props.projectId + "/comments"}
        >
          Comments
        </Link>
      </li>
    </ul>
  );
}

function ProjectTabs(props) {
  if (props.tab === "description") {
    return <DescriptionTab description={props.project.description} />;
  } else if (props.tab === "comments") {
    return <CommentsTab projectId={props.project.id} />;
  }
}

function DescriptionTab(props) {
  return <p>{props.description}</p>;
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
    console.log(comments);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
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
  const time = moment(comment.date_time).fromNow();
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
              {time}
            </a>
          </span>
        </div>

        <p>{comment.message}</p>
      </div>
    </div>
  );
}

export default ProjectDescription;
