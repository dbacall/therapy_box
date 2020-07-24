import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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

    // console.log(newUser);
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
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <h1>Dev Challenge</h1>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="">
                <input
                  onChange={this.onChangeImage}
                  // value={this.state.profilePicture}
                  id="profilePicture"
                  type="file"
                />
              </div>
              <div className="">
                <button type="submit" className="">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
