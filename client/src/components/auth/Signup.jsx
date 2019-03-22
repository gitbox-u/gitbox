import React from 'react'
import { Grid, Button, TextField, Typography, withStyles } from '@material-ui/core'
import logo from '../../assets/logo.svg';
import { tryRegister, updateLoginField } from '../../reducers/login';
import { connect } from 'react-redux';

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
  },
};

function Signup(props) {
  const { 
    classes, history, 
    username, password, confirm,
    tryRegister, updateLoginField,
  } = props;

  const handleRegister = () => {
    tryRegister().then(
      res => {
        alert(res.message);
        history.push('login');
      }
    );
  };

  const handleChange = (field) => (e) => {
    updateLoginField(field, e.target.value);
  }

  return (
    <Grid container
      direction="column"
      alignItems="center"
      spacing={8}
      justify="center">
      <Grid item>
        <img src={logo} className={classes.logo} alt="Gitmap" />
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
          value={username}
          onChange={handleChange('username')}
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
          value={password}
          onChange={handleChange('password')}
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
          value={confirm}
          onChange={handleChange('confirm')}
        />
      </Grid>
      <Grid item>
        <Button fullWidth variant="outlined" color="primary" onClick={handleRegister}
          className={classes.formButton}>Register</Button>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = {
  updateLoginField, tryRegister
}

const mapStateToProps = (state) => {
  const { login } = state;
  const { username, password, confirm } = login;
  return {
    username, password, confirm,
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Signup));