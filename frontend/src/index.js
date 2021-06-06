import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom'

import useAuth, { ProvideAuth } from './hooks/useAuth'
import ProtectedPage from './pages/ProtectedPage'
import Register from './pages/Register'
import Login from './pages/Login'

import './global.css'

// A wrapper on the Route component that will render children...
// ... only if user is logged in, otherwise will redirect to ...
// ... another route. 
const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth()
  const location = useLocation()

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
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          
          <PrivateRoute exact path="/protected">
            <ProtectedPage />
          </PrivateRoute>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
