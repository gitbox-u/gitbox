import React, {Component} from 'react';
import {withStyles, AppBar, Toolbar, IconButton, Button} from '@material-ui/core';
import logo from '../assets/logo.svg';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import Mail from '@material-ui/icons/MailOutline'
import Badge from '@material-ui/core/Badge';

import {logout} from '../reducers/login';

import PopUp from './PopupMenu';

const styles = {
  grow: {
    flexGrow: 1,
  },

  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid #e5e5e5;'
    // backgroundColor: 'lightblue'
  }
};

class Header extends Component {

  routeChange = (path) => () => {
    this.props.history.push(path);
  };

  render() {

    const {classes} = this.props;
    const {loggedIn, isAdmin, username} = this.props;
    const {logout} = this.props;

    return (
      <AppBar className={classes.appBar} color="primary" position="fixed">
        <Toolbar>
          <IconButton color="inherit">
            <img src={logo} width="40" alt="Gitmap"/>
          </IconButton>


          <div className={classes.grow}/>

          <PopUp></PopUp>

          <IconButton color='inherit'>
            <Badge className={classes.margin} badgeContent={99} color="secondary"><Mail></Mail></Badge>
          </IconButton>

          <Button onClick={this.routeChange("/")} color="inherit" variant="text">
            Home
          </Button>
          {
            isAdmin ?
              <Button onClick={this.routeChange("/admin")} color="inherit" variant="text">
                Admin Panel
              </Button> :
              <Button onClick={this.routeChange("/dashboard")} color="inherit" variant="text">
                Dashboard
              </Button>
          }
          {
            loggedIn ?
              <Button onClick={e => {
                logout();
                this.routeChange("/login")();
              }} color="inherit" variant="text">
                {`Logout ${username}`}
              </Button> :
              <Button onClick={this.routeChange("/login")} color="inherit" variant="text">
                Login
              </Button>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  const {login} = state;
  const {loggedIn, isAdmin, username} = login;
  return {loggedIn, isAdmin, username}
};

const mapDispatchToProps = {
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));