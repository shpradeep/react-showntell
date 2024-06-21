// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


import Home from './Home';
import Patient from './Patient';
import Observation from './Observation';
import Login from './Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <nav className="navbar navbar-horizontal">
            <ul>
              <li>
                <Link to="/login">Sign in</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="main-content">
          <nav className="navbar navbar-vertical">
            <ul>
              <li>
                <Link to="/patient">Patient</Link>
              </li>
              <li>
                <Link to="/observation">Observation</Link>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/patient" element={<Patient />}>          
              </Route>
              <Route path="/observation" element={ <Observation /> }>
              </Route>
              <Route path="/" element={ <Home /> }>
              </Route>
              <Route path="/login" element={ <Login /> }>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
