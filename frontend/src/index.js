import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'

import './global.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/register">
        <Register />
      </Route>

      <Route path="/login">
        <Login />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
