import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../stylesheets/AddPhoto.css';

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      redirect: false,
    };
  }

  onChangeImage = (e) => {
    this.setState({ photo: e.target.files[0] });
  };

  onSubmit = () => {
    const userId = this.props.location.state.user.id;
    var data = new FormData();
    data.append('userId', userId);
    data.append('photo', this.state.photo);

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    axios
      .post('http://localhost:5000/photos/create', data, config)
      .then((res) => {
        console.log(res);
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errors: err.response });
      });
  };

  render() {
    return this.state.redirect ? (
      <Redirect
        to={{
          pathname: '/',
          state: {
            user: this.props.location.state.user,
          },
        }}
      />
    ) : (
      <div className="add-photo-container">
        <h1 className="add-photo-title">Add Photo</h1>
        <div className="photo-upload-container">
          <input
            onChange={this.onChangeImage}
            id="photo"
            type="file"
            className="photo-upload"
          />
          <label className="photo-upload-label" for="photo">
            Choose a photo
          </label>
        </div>
        <button onClick={this.onSubmit} className="add-photo-btn">
          Add Photo
        </button>
      </div>
    );
  }
}

export default AddPhoto;
