import React, { Component } from 'react';
import { withStyles, AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
}

const Header = (props) => {

    const { classes } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" color="inherit" noWrap>
                    Gitbox
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(Header);