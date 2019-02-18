import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';

import { AppBar, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { indigo , white} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(43, 36, 77)',
      }
    }
})

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
