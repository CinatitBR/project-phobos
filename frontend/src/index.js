import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'

import './global.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
