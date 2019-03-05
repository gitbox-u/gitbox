import React, {useEffect} from 'react'
import {Grid, Paper, Button, TextField, Typography, withStyles} from '@material-ui/core'
// import {withRouter} from "react-router-dom";
import logo from '../assets/logo.svg';
import {geometric} from "../geo/geo";

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

function Signup(props) {
  useEffect(() => {
    try {
      geometric();
    } catch (e) {
      console.err("*hug* this background");
    }
  });

  const {classes} = props;

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
            <Grid container
                  direction="column"
                  alignItems="center"
                  spacing={8}
                  justify="center">
              <Grid item>
                <img src={logo} className={classes.logo} alt="Gitmap"/>
              </Grid>
              <Grid item>
                <Typography variant="h4" className={classes.logoLabel}>
                  GITBOX
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  // value={username}
                  // onChange={this.handleLoginChange("username")}
                  fullWidth
                  placeholder="Username"
                  className={classes.formInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  // value={password}
                  // onChange={this.handleLoginChange("password")}
                  fullWidth
                  type="password"
                  placeholder="Password"
                  className={classes.formInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  // value={password}
                  // onChange={this.handleLoginChange("password")}
                  fullWidth
                  type="password"
                  placeholder="Confirm password"
                  className={classes.formInput}
                />
              </Grid>
              <Grid item>
                <Button fullWidth variant="outlined" color="primary" onClick={console.log('TODO')}
                        className={classes.formButton}>Register</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Signup);