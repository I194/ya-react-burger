import React from "react";
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {

  const isAuth = () => {
    // if (!localStorage.initTime) return false; // there is no token at all...
    // return (Date.now() / 1000) < (localStorage.initTime + 1200);
    return localStorage.refreshToken;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => 
        isAuth() ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/login',
              state: {from: location}
            }} 
          />
        )
      }
    />
  );
} 

ProtectedRoute.propTypes = {
  rest: PropTypes.object,
  children: PropTypes.element.isRequired
}