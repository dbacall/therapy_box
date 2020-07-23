import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {},
      redirect: false,
      user: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post('http://localhost:5000/users/login', userData)
      .then((res) => {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        // Set token to Auth header
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.setState({ user: decoded, redirect: true });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errors: err.response.data });
      });

    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return this.state.redirect ? (
      <Redirect
        to={{
          pathname: '/dashboard',
          state: { user: this.state.user },
        }}
      />
    ) : (
      <div className="container">
        <div className="">
          <div className="">
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <h1>Dev Challenge</h1>
              <p className="">
                New to the challenge? <Link to="/register">Sign up</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="username"
                  placeholder="Username"
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
                <button type="submit" className="">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
