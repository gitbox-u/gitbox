import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard';
import Repository from './components/repository/Repository';
import Admin from './components/admin/Admin';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(40, 40, 40);',
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
    const {location} = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        {location.pathname !== '/login' && <Header/>}
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/repository/:id" component={Repository}/>
        <Route exact path="/admin" component={Admin}/>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
