import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      profilePicture: '',
      errors: {},
      redirect: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeImage = (e) => {
    this.setState({ profilePicture: e.target.files[0] });
  };

  onSubmit = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append('username', this.state.username);
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('password2', this.state.password2);
    data.append('profilePicture', this.state.profilePicture);

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    axios
      .post('http://localhost:5000/users/register', data, config)
      .then((res) => {
        console.log(res);
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errors: err.response.data });
      });
    console.log(this.state);
  };

  render() {
    const { errors } = this.state;
    return this.state.redirect ? (
      <Redirect to={'/login'} />
    ) : (
      <div>
        <h1 className="login-title">Dev Challenge</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-row">
            <div className="row-item">
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="username"
                type="text"
                placeholder="Username"
                className="text-input"
              />
              <span className="error">{errors.username}</span>
            </div>
            <div className="row-item">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className="text-input"
                placeholder="Email"
              />
              <span className="error">{errors.email}</span>
            </div>
          </div>
          <div className="register-input-row">
            <div className="row-item">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                placeholder="Password"
                className="text-input"
              />
              <span className="error">{errors.password}</span>
            </div>
            <div className="row-item">
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                placeholder="Confirm Password"
                className="text-input"
              />
              <span className="error">{errors.password2}</span>
            </div>
          </div>
          <div className="profpic-upload-container">
            <input
              onChange={this.onChangeImage}
              id="profilePicture"
              type="file"
              className="profpic-upload"
            />
            <label className="upload-label" for="profilePicture">
              Add Picture
            </label>
          </div>
          <div className="register-btn-container">
            <button type="submit" className="register-btn">
              Register
            </button>
          </div>
        </form>
        <p className="login-msg">
          Already signed up?{' '}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </p>
      </div>
    );
  }
}
export default Register;
