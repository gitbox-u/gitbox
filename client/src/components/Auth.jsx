import React, {useEffect} from 'react'
import {Grid, Paper, Button, TextField, Typography, withStyles} from '@material-ui/core'
import {Route, withRouter} from "react-router-dom";
import logo from '../assets/logo.svg';
import {geometric} from "../geo/geo";
import Login from './Login';
import Signup from './Signup';

const styles = {
  formContainer: {
    padding: '50px 90px',
    margin: '10px',
    minWidth: 300,
  },

  formInput: {
    marginTop: '5px',
    borderBottom: '1px solid black',
    padding: '0 5px',
  },

  formButton: {
    marginTop: '10px',
  },

  logo: {
    width: 130
  },

  logoLabel: {
    letterSpacing: '0.1em'
  }
};

function Auth({classes, location}) {
  useEffect(() => {
    try {
      geometric();
    } catch (e) {
      console.err("*hug* this background");
    }
  });

  return (
    <div>
      <div id="bg"/>
      <Grid
        container
        alignItems="center"
        spacing={0}
        justify="center"
        direction="column"
        style={{minHeight: '85vh'}}
      >
        <Grid item>
          <Paper className={classes.formContainer}>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(withStyles(styles)(Auth));