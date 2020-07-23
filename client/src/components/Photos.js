import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <div>
        <h1>Photos</h1>
        <Link
          to={{
            pathname: '/photos/add',
            state: {
              user: this.props.location.state.user,
            },
          }}
        >
          +
        </Link>
        {photos.map((photo, i) => {
          return (
            <img
              src={`http://localhost:5000/${photo.photo}`}
              alt={`Photo ${i + 1}`}
              height="200"
            />
          );
        })}
      </div>
    );
  }
}

export default Photos;
