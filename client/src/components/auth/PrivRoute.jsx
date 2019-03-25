import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Privileged route (requires login)
// Sources: https://tylermcginnis.com/react-router-protected-routes-authentication/
// https://stackoverflow.com/questions/43520498/react-router-private-routes-redirect-not-working

function PrivRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      { ...rest }
      render={ props =>
        auth ? (
          <Component { ...props } />
        ) : (
          <Redirect to={ { pathname: '/login', state: { from: props.location } } }/>
        )
      }
    />
  );
}

export default PrivRoute;