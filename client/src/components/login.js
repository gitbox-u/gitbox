import React, { Component } from 'react';
import { Button, Card, TextField, withStyles, CardHeader, Typography, Tab, Tabs } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateLoginField } from '../redux/reducer';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  formContainer: {
    padding: 20,
    maxWidth: 300,
  },

  formInput: {
    marginBottom: 10
  },

  formButton: {
    marginTop: 10,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }
}

class Login extends Component {

  handleChange = name => event => {
    this.props.updateLoginField(name, event.target.value);
  }

  render() {

    const { classes } = this.props;
    const { username, password } = this.props;

    return (
      <Card className={classes.formContainer}>
        <TextField
          value={username}
          onChange={this.handleChange("username")}
          fullWidth
          label="Username"
          className={classes.formInput} /> <br />

        <TextField
          value={password}
          onChange={this.handleChange("password")}
          fullWidth
          type="password"
          label="Password"
          className={classes.formInput} /> <br />

        <Button fullWidth variant="contained" color="primary" className={classes.formButton}>Login</Button> <br />
      </Card>
    );
  }
}

const mapDispatchToProps = {
  updateLoginField
}

const mapStateToProps = (state) => {
  const { username, password } = state;

  return {
    username, password
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));