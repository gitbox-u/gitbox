import React, { Component } from 'react';
import { Button, Fab, withStyles, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateLoginField, tryLogin } from '../../reducers/login';
import AddIcon from '@material-ui/icons/Add';
import {withRouter} from "react-router-dom";



const styles = {
  formInput: {
    marginTop: '5px',
    borderBottom: '1px solid black',
    padding: '0 5px',
  },

  button: {
    height: "40px",
    marginTop: "20px",
    marginLeft: "20px",
  },

  logo: {
    width: 130
  },

  logoLabel: {
    letterSpacing: '0.1em'
  }
};

class AddUser extends Component {
  routeChange = path => {
    this.props.history.push(path);
  };

  handleSignup = () => {
    this.routeChange('signup');
  };

  render() {
    const {classes } = this.props;

    return (


    <Button onClick={this.handleSignup} className={classes.button}><AddIcon style ={{fontSize: 30, marginRight: 10}}></AddIcon> Create a New user</Button>


    );
  }
}

const mapDispatchToProps = {
  updateLoginField,
};


export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(AddUser)));