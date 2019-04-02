import React, {Component} from 'react';
import {withStyles, AppBar, Toolbar, IconButton, Button} from '@material-ui/core';
import logo from '../../assets/logo.svg';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

import {logout} from '../../reducers/login';

import PopUp from './Notifications';

const styles = {
  grow: {
    flexGrow: 1,
  },

  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid #e5e5e5;'
  }
};

class Header extends Component {

  routeChange = (path) => () => {
    this.props.history.push(path);
  };

  render() {

    const {classes} = this.props;
    const {auth, admin, username} = this.props;
    const {logout} = this.props;

    return (
      <AppBar className={classes.appBar} color="primary" position="fixed">
        <Toolbar>
          <IconButton disabled color="inherit">
            <img src={logo} width="40" alt="Gitmap"/>
          </IconButton>


          <div className={classes.grow}/>

          {/* {
            auth && <PopUp></PopUp>
          } */}
          {
            auth ? admin ?
              <Button onClick={this.routeChange("/admin")} color="inherit" variant="text">
                Admin Panel
              </Button> :
              <Button onClick={this.routeChange("/dashboard")} color="inherit" variant="text">
                Dashboard
              </Button> : <div></div>
          }
          {
            auth ?
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
  const {auth, admin, username} = login;
  return {auth, admin, username}
};

const mapDispatchToProps = {
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));