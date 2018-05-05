import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../css/Project.css';

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
    axios.get("http://127.0.0.1:8080/v0/projects/" + this.props.match.params.id, { crossdomain: true }).then(
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
    );
  }

  render() {
    const {project} = this.state;
    const { error, isLoaded, projects } = this.state;
    const images = ['https://picsum.photos/1024/576/?image=777', 'https://picsum.photos/1024/576/?image=778', 'https://picsum.photos/1024/576/?image=779', 'https://picsum.photos/1024/576/?image=780']
    const videos = ['https://www.youtube-nocookie.com/embed/JhHMJCUmq28?rel=0', 'https://www.youtube-nocookie.com/embed/mZsaaturR6E?rel=0']

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="project">
          <ProjectHeader project={project}/>
          <div className="row">
            <div className="col-6">
              <ProjectGallery images={images} videos={videos}/>
            </div>
            <div className="col-6">

            </div>
          </div>
        </div>
      );
    }
  }
}

class ProjectHeader extends Component {
  render() {
    const project = this.props.project;
    const ownerImage = 'https://picsum.photos/512/512/?image=777'

    return (
      <div className="project-header row">
        <div className="col-3 d-flex flex-column align-items-center">
          <img className="project-owner-image w-25 m-1" src={project.owners[0].image_link || ownerImage}/>
          By {project.owners[0].name + ' ' + project.owners[0].surname}
          <a type="button" className="btn btn-light m-1">Follow</a>
        </div>
        <div className="col-9 d-flex flex-column">
          <h2 className="p-1 flex-fill">{project.name}</h2>
          <div className="text-muted p-1 flex-fill">{project.short_description}</div>
        </div>
      </div>
    );
  }
}

class ProjectGallery extends Component {
  render() {
    const images = this.props.images || [];
    const videos = this.props.videos || [];

    const carouselIndicators = [];
    for (let i = 0; i < images.length + videos.length; i++) {
      carouselIndicators.push(<li data-target="#project-gallery-carousel" data-slide-to={i} className={i == 0 ? "active" : ""}></li>)
    }

    return (
      <div id="project-gallery-carousel" className="carousel slide" data-interval="false">
      
        <ol className="carousel-indicators">
          {carouselIndicators}
        </ol>
      <div className="carousel-inner">
        {videos.map((video, index) => (
          <GalleryItem active={index == 0}>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={video} allow="encrypted-media" allowfullscreen></iframe>
            </div>
          </GalleryItem>
        ))}
        {images.map((image, index) => (
          <GalleryItem active={(videos.length + index) == 0}>
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
    </div>
    );
  }
}

class GalleryItem extends Component {
  render() {
    const isActive = this.props.active;
    const itemClass = 'carousel-item' + (isActive ? ' active' : '');

    return (
        <div className={itemClass}>
          {this.props.children}
        </div>
    );
  }
}

export default Project;