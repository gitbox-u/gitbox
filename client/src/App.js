import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login';

import { Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(1, 105, 193);',
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
      'Hind+Siliguri',
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
