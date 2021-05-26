import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/Register'

import './global.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>

      <Route path="/register">
        <Register />
      </Route>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
