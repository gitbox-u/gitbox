import React, {Component} from 'react';
import {Button, Card, TextField, withStyles, Grid, Typography, Tab, Tabs, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {updateLoginField, tryLogin} from '../reducers/loginReducer';
import {withRouter} from "react-router-dom";
import logo from '../assets/logo.svg';

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
    marginTop: '20px',
  },

  logo: {
    width: 130
  },

  logoLabel: {
    letterSpacing: '0.1em'
  }
};

class Login extends Component {

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange = (path) => () => {
    this.props.history.push(path);
  };

  handleChange = name => event => {
    this.props.updateLoginField(name, event.target.value);
  };

  componentDidMount() {
    window.geometric();

  }

  handleSubmit = event => {
    this.props.tryLogin();
    this.routeChange("dashboard")();
  };

  render() {

    const {classes} = this.props;
    const {username, password} = this.props;

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
                  <img src={logo} className={classes.logo}/>
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
                    value={username}
                    onChange={this.handleChange("username")}
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
                    value={password}
                    onChange={this.handleChange("password")}
                    fullWidth
                    type="password"
                    placeholder="Password"
                    className={classes.formInput}
                  />
                </Grid>
                <Grid item>
                  <Button fullWidth variant="outlined" color="primary" onClick={this.handleSubmit}
                          className={classes.formButton}>Login</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>


    );
  }
};

const mapDispatchToProps = {
  updateLoginField,
  tryLogin,
};

const mapStateToProps = (state) => {
  const {username, password} = state;

  return {
    username, password
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));