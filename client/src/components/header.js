import React, { Component } from 'react';
import { withStyles, AppBar, Typography, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg';
import {withRouter} from "react-router-dom";

const styles = {
    grow: {
        flexGrow: 1,
    },
};

class Header extends Component {

    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange = (path) => () => {
        this.props.history.push(path);
    };

    render() {

        const {classes} = this.props;

        return (
            <AppBar color="primary" position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <img src={logo} width="40"/>
                    </IconButton>
                    <Typography color="inherit" variant="h4">
                        Gitmap
                    </Typography>
                    <div className={classes.grow}/>
                    <Button onClick={this.routeChange("")} color="inherit" variant={"text"}>
                        Home
                    </Button>
                    <Button onClick={this.routeChange("dashboard")} color="inherit" variant={"text"}>
                        Dashboard
                    </Button>
                    <Button onClick={this.routeChange("login")} color="inherit" variant={"text"}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(withStyles(styles)(Header));