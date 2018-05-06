import React, { Component } from "react";

import FollowIcon from './FollowIcon';

class ProjectGallery extends Component {
  render() {
    const images = this.props.images || [];
    const videos = this.props.videos || [];

    const carouselIndicators = [];
    for (let i = 0; i < images.length + videos.length; i++) {
      carouselIndicators.push(<li data-target="#project-gallery-carousel" data-slide-to={i} className={i === 0 ? "active" : ""} key={i}></li>)
    }

    return (
      <div id="project-gallery-carousel" className="carousel slide" data-interval="false">

        <ol className="carousel-indicators">
          {carouselIndicators}
        </ol>
      <div className="carousel-inner">
        {videos.map((video, index) => (
          <GalleryItem active={index === 0} key={index}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe title={'Youtube video ' + index} className="embed-responsive-item" src={video} allow="encrypted-media" allowFullScreen></iframe>
            </div>
          </GalleryItem>
        ))}
        {images.map((image, index) => (
          <GalleryItem active={(videos.length + index) === 0} key={videos.length + index}>
            <img className="d-block img-fluid" src={image} alt="Slide"/>
          </GalleryItem>
        ))}
      </div>
      <a className="carousel-control-prev" href="#project-gallery-carousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#project-gallery-carousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <FollowIcon size='2'/>
    </div>
    );
  }
}

function GalleryItem(props) {
  const isActive = props.active;
  const itemClass = 'carousel-item' + (isActive ? ' active' : '');

  return (
      <div className={itemClass}>
        {props.children}
      </div>
  );
}

export default ProjectGallery;