import React, { Component } from 'react';
import { withStyles, AppBar, Typography, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {logout} from '../reducers/login';

const styles = {
    grow: {
        flexGrow: 1,
    },

    appBar: {
        boxShadow: 'none',
        borderBottomWidthWidth: 1,
        borderBottomColor: 'lightgray',
        borderBottom: 'solid'
        // backgroundColor: 'lightblue'
    }
};

class Header extends Component {

    routeChange = (path) => () => {
        this.props.history.push(path);
    };

    render() {

        const { classes } = this.props;
        const { loggedIn, isAdmin, username } = this.props;
        const { logout } = this.props;

        console.log(logout);

      return (
            <AppBar className={classes.appBar} color="white" position="fixed" >
                <Toolbar>
                    <IconButton color="inherit">
                        <img src={logo} width="40" />
                    </IconButton>
                    {/*<Typography color="inherit" variant="h4">*/}
                        {/*Gitmap*/}
                    {/*</Typography>*/}

                    <div className={classes.grow} />

                    {/*<Typography color="inherit" variant="h6">{`Logged in as ${username}`}</Typography>*/}

                    <div className={classes.grow} />

                    <Button onClick={this.routeChange("/")} color="inherit" variant="text">
                        Home
                    </Button>
                    {
                        isAdmin ?
                        <Button onClick={this.routeChange("/dashboard")} color="inherit" variant="text">
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
                            Logout
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
    const { login } = state;
    const { loggedIn, isAdmin, username } = login;
    return { loggedIn, isAdmin, username }
};

const mapDispatchToProps = {
    logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));