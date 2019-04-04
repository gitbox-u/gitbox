import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import Repository from '../repository/Repository';
import Admin from '../admin/Admin';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import Auth from '../auth/Auth';
import PrivRoute from '../auth/PrivRoute';
import Home from './Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(40, 40, 40);',
      contrastText: 'rgb(225, 225, 225)',
    },
    secondary: {
      main: 'rgb(41, 107, 187)',
      contrastText: 'rgb(255, 255, 255)',
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Hind+Siliguri',
      'Roboto'
    ].join(','),
  },
});

class App extends Component {
  render() {
    const { location, auth } = this.props;
    return (
      <MuiThemeProvider theme={ theme }>
        { location.pathname !== '/login' && location.pathname !== '/signup' && <Header/> }
        <Route exact path='/' component={ Home }/>
        <Route exact path='/login' component={ Auth }/>
        <Route exact path='/signup' component={ Auth }/>
        <PrivRoute exact path='/dashboard' component={ Dashboard } auth={auth}/>
        <PrivRoute exact path='/repository/:id' component={ Repository } auth={auth}/>
        <PrivRoute exact path='/admin' component={ Admin } auth={auth}/>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({ auth: state.login.auth });

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
