import React, { Component } from 'react';
import { withStyles, AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg';

const styles = {
};

const Header = (props) => {

    const { classes } = props;

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <IconButton color="inherit">
                    <img src={logo} width="40" />
                </IconButton>
                <Typography color="inherit" variant="h4">
                    Gitbox
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(Header);