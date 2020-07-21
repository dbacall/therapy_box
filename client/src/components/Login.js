import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      usernmae: this.state.usernmae,
      password: this.state.password,
    };
    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return (
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
