import React, { Component } from 'react';
import { Button, TextField, withStyles, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateLoginField, tryLogin } from '../../reducers/login';
import logo from '../../assets/logo.svg';

const styles = {
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

class Login extends Component {
  routeChange = path => {
    this.props.history.push(path);
  };

  handleLoginChange = name => event => {
    this.props.updateLoginField(name, event.target.value);
  };

  handleLogin = () => {
    this.props.tryLogin().then(
      res => {
        if (res.result.auth) {
          if (res.result.admin)
            this.routeChange('admin');
          else
            this.routeChange('dashboard');

        }
      }
    );
  };

  handleSignup = () => {
    this.routeChange('signup');
  };

  render() {
    const { username, password, classes } = this.props;

    return (
      <Grid container
        direction='column'
        alignItems='center'
        spacing={8}
        justify='center'>
        <Grid item>
          <img src={logo} className={classes.logo} alt='Gitmap' />
        </Grid>
        <Grid item>
          <Typography variant='h4' className={classes.logoLabel}>
            GITBOX
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            value={username}
            onChange={this.handleLoginChange('username')}
            fullWidth
            placeholder='Username'
            className={classes.formInput}
          />
        </Grid>
        <Grid item>
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            value={password}
            onChange={this.handleLoginChange('password')}
            fullWidth
            type='password'
            placeholder='Password'
            className={classes.formInput}
          />
        </Grid>
        <Grid item>
          <Button fullWidth variant='outlined' color='primary' onClick={this.handleLogin}
            className={classes.formButton}>Login</Button>
          <Button fullWidth variant='outlined' color='primary' onClick={this.handleSignup}
            className={classes.formButton}>Register</Button>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  updateLoginField,
  tryLogin,
};

const mapStateToProps = (state) => {
  const { login } = state;
  const { username, password } = login;

  return { username, password };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));