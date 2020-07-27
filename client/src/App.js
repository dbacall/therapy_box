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
import Sport from './components/Sport';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/tasks" component={Tasks} />
          <PrivateRoute exact path="/photos" component={Photos} />
          <PrivateRoute exact path="/photos/add" component={AddPhoto} />
          <PrivateRoute exact path="/news" component={News} />
          <PrivateRoute exact path="/sport" component={Sport} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
