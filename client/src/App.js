import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks" component={Tasks} />
      </div>
    </Router>
  );
}

export default App;
