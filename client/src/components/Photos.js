import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Photos.css';
import plus from '../assets/Plus_button.png';
import { config } from '../constants';

const url = config.url.API_URL;

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: this.props.location.state.photos,
    };
  }
  render() {
    const { photos } = this.state;
    return (
      <div className="photos-container">
        <h1 className="photos-title">Photos</h1>
        <div className="gallery">
          <Link
            to={{
              pathname: '/photos/add',
            }}
            className="add-photo-link"
          >
            <img src={plus} className="plus-icon" alt="plus" />
          </Link>
          {photos.map((photo, i) => {
            return (
              <div className="photo-frame" key={'photo' + i}>
                <img
                  src={`${url}/uploads/${photo.photo}`}
                  alt={`${i + 1}`}
                  height="200"
                  className="photo"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Photos;
