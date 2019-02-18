import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import Dashboard from './components/dashboard/dashboard'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(1, 105, 193);',
      contrastText: 'rgb(225, 225, 225)',
    },
    secondary: {
      main: 'rgb(232, 166, 0)',
      contrastText: 'rgb(25, 25, 25)',
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
    const { location } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
          {location.pathname !== '/login' && <Header />}
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
