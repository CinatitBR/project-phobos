import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom'

import useAuth, { ProvideAuth } from './hooks/useAuth'
import ProtectedPage from './pages/ProtectedPage'
import Register from './pages/Register'
import Login from './pages/Login'

import './global.css'

// A wrapper on the Route component that will render children ...
// ... based on a condition - public, unauth or auth
const CustomRoute = ({ 
  condition = 'public', 
  children, 
  ...rest 
}) => {
  const auth = useAuth()
  const location = useLocation()

  switch (condition) {
    case 'auth':
      return (
        <Route {...rest}>
          {auth.user ? (
            children
          ) : (
            <Redirect 
              to={{ 
                pathname: '/login', 
                state: { from: location } 
              }} 
            />
          ) 
          }
        </Route>
      )

    case 'unauth':
      return (
        <Route {...rest}>
          {auth.user ? (
            <Redirect 
              to="/"
            />
          ) : (
            children
          )
          }
        </Route>
      )

    default:
      return (
        <Route {...rest}>
          {children}
        </Route>
      )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          
          <CustomRoute condition="auth" exact path="/">
            <ProtectedPage />
          </CustomRoute>

          <CustomRoute condition="unauth" exact path="/register"> 
            <Register />
          </CustomRoute>

          <CustomRoute condition="unauth" exact path="/login">
            <Login />
          </CustomRoute>

        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
