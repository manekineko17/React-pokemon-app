import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => {
      // on demande au service si un utilisateur est déjà connecté
      const isAuthenticated = AuthenticationService.isAuthenticated;
      if (!isAuthenticated) {
        return <Redirect to={{ pathname: '/login' }} />;
      }

      //on redirige vers le composant demandé
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
