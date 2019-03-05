import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import Repository from '../repository/Repository';
import Admin from '../admin/Admin';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import { initLogin } from '../../reducers/login';
import Auth from "../auth/Auth";
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
  componentDidMount() {
    this.props.initLogin();
  }

  render() {
    const { location } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/signup" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/repository/:id" component={Repository} />
        <Route exact path="/admin" component={Admin} />
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  initLogin,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
