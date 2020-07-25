import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Photos.css';

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
              state: {
                user: this.props.location.state.user,
              },
            }}
            className="add-photo-link"
          >
            +
          </Link>
          {photos.map((photo, i) => {
            return (
              <div className="photo-frame">
                <img
                  src={`http://localhost:5000/uploads/${photo.photo}`}
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
