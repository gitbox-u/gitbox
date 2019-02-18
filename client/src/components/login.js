import React, {Component} from 'react';
import {Button, Card, TextField, withStyles, Grid, Typography, Tab, Tabs, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {updateLoginField} from '../redux/reducer';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg';

const styles = {
    formContainer: {
        padding: 40,
        minWidth: 300,
    },

    formInput: {
        // marginBottom: 10
    },

    formButton: {
        marginTop: 20,
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },

    logo: {
        width: 130
    }
};

class Login extends Component {

    handleChange = name => event => {
        this.props.updateLoginField(name, event.target.value);
    }

    render() {

        const {classes} = this.props;
        const {username, password} = this.props;

        return (
            <Grid
                container
                alignItems="center"
                spacing={0}
                justify="center"
                direction="column"
                style={{minHeight: '80vh'}}
            >
                <Grid item>
                    <Paper className={classes.formContainer}>
                        <Grid container
                              direction="column"
                              alignItems="center"
                              spacing={8}
                              justify="center">
                            <Grid item>
                                <img src={logo} className={classes.logo}/>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    Gitbox
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    value={username}
                                    onChange={this.handleChange("username")}
                                    fullWidth
                                    label="Username"
                                    className={classes.formInput}/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    value={password}
                                    onChange={this.handleChange("password")}
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    className={classes.formInput}/>
                            </Grid>
                            <Grid item>
                                <Button fullWidth variant="contained" color="primary"
                                        className={classes.formButton}>Login</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}

const mapDispatchToProps = {
    updateLoginField
}

const mapStateToProps = (state) => {
    const {username, password} = state;

    return {
        username, password
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));