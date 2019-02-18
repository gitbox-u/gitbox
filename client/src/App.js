import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';

import { AppBar, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(70, 16, 77)',
        contrastText: 'rgb(225, 225, 225)',
      },
      secondary: {
        main: 'rgb(200, 200, 200)',
        contrastText: 'rgb(25, 25, 25)',
      }
    }
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Route exact path="/login" component={Login} />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
