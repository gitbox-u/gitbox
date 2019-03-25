import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Privileged route (requires login)
// Source: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

function PrivRoute({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

const mapStateToProps = state => ({auth: state.login.auth});

export default connect(mapStateToProps)(PrivRoute);