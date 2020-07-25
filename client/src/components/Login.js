import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import '../stylesheets/Login.css';

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
        const { token } = res.data;
        const decoded = jwt_decode(token);
        this.setState({ user: decoded, redirect: true });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errors: err.response.data });
      });
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
      <div>
        <h1 className="login-title">Dev Challenge</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-row">
            <div className="row-item">
              <input
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                id="username"
                type="username"
                placeholder="Username"
                className="text-input"
              />
              <span className="error">{errors.username}</span>
              <span className="error">{errors.usernotfound}</span>
            </div>
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
              <span className="error">{errors.passwordincorrect}</span>
            </div>
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
        <p className="register-msg">
          New to the challenge?{' '}
          <Link to="/register" className="register-link">
            Sign up
          </Link>
        </p>
      </div>
    );
  }
}
export default Login;
