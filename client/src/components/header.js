import React, { Component } from 'react';
import { withStyles, AppBar, Typography, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg';

const styles = {
    grow: {
        flexGrow: 1,
    },
}

const Header = (props) => {

    const { classes } = props;

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <IconButton color="inherit">
                    <img src={logo} width="40" />
                </IconButton>
                <Typography color="inherit" variant="h4">
                    Gitbox
                </Typography>
                <div className={classes.grow} />
                <Button color="inherit" variant={"text"}>
                    Home
                </Button>
                <Button color="inherit" variant={"text"}>
                    Dashboard
                </Button>
                <Button color="inherit" variant={"text"}>
                    Login
                </Button>

            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(Header);