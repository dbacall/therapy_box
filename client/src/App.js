import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Photos from './components/Photos';
import AddPhoto from './components/AddPhoto';
import News from './components/News';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/photos/add" component={AddPhoto} />
        <Route exact path="/news" component={News} />
      </div>
    </Router>
  );
}

export default App;
