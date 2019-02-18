import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login';

import { AppBar, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// import { indigo , white} from '@material-ui/core/colors';

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
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto'
    ].join(','),
    },
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Route exact path="/login" component={Login} />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
