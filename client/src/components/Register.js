import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
      redirect: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      profilePicture: this.state.profilePicture,
    };
    console.log(newUser);
    axios
      .post('http://localhost:5000/users/register', newUser)
      .then((res) => {
        this.setState({ redirect: true });
      })
      .catch((err) => this.setState({ errors: err }));
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
                  onChange={this.onChange}
                  value={this.state.profilePicture}
                  id="profilePicture"
                  type="file"
                />
              </div>
              <div className="" style={{ paddingLeft: '11.250px' }}>
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
