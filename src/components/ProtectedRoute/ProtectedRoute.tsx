import React, { FunctionComponent } from "react";
import { Route, Redirect } from 'react-router-dom';
import { IProtectedRoute } from "../../services/types/components";

export const ProtectedRoute: FunctionComponent<IProtectedRoute> = ({ children, ...rest }) => {

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