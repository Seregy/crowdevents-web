import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';

import FollowIcon from "./FollowIcon";

import "../css/ProjectGallery.css";

class ProjectGallery extends Component {
  render() {
    const images = this.props.images || [];
    const videos = this.props.videos || [];

    const carouselIndicators = [];
    for (let i = 0; i < images.length + videos.length; i++) {
      carouselIndicators.push(
        <li
          data-target="#project-gallery-carousel"
          data-slide-to={i}
          className={i === 0 ? "active" : ""}
          key={i}
        />
      );
    }

    return (
      <div
        id="project-gallery-carousel"
        className="carousel slide"
        data-interval="false"
      >
        <ol className="carousel-indicators">{carouselIndicators}</ol>
        <div className="carousel-inner">
          {videos.map((video, index) => (
            <GalleryItem active={index === 0} key={index}>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title={"Youtube video " + index}
                  className="embed-responsive-item"
                  src={video}
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
            </GalleryItem>
          ))}
          {images.map((image, index) => (
            <GalleryItem
              active={videos.length + index === 0}
              key={videos.length + index}
            >
              <img className="d-block img-fluid" src={image} alt="Slide" />
            </GalleryItem>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#project-gallery-carousel"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">
            <FormattedMessage
              id="app.project.gallery.previous"
              defaultMessage="Previous"
            />
          </span>
        </a>
        <a
          className="carousel-control-next"
          href="#project-gallery-carousel"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">
            <FormattedMessage
              id="app.project.gallery.next"
              defaultMessage="Next"
            />
          </span>
        </a>
        <FollowIcon size="2" />
      </div>
    );
  }
}

function GalleryItem(props) {
  const isActive = props.active;
  const itemClass = "carousel-item" + (isActive ? " active" : "");

  return <div className={itemClass}>{props.children}</div>;
}

export default ProjectGallery;
