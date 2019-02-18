import React, {Component} from 'react';
import {Button, Card, TextField, withStyles, Grid, Typography, Tab, Tabs, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {updateLoginField} from '../redux/reducer';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg';

const styles = {
    formContainer: {
        padding: '50px 90px',
        minWidth: 300,
    },

    formInput: {
        marginTop: '5px',
        borderBottom: '1px solid black',
    },

    formButton: {
        marginTop: '20px',
    },

    logo: {
        width: 130
    },

    logoLabel: {
      letterSpacing: '0.1em'
    }
};

class Login extends Component {

  handleChange = name => event => {
    this.props.updateLoginField(name, event.target.value);
  };

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
                style={{minHeight: '85vh'}}
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
                                <Typography variant="h4" className={classes.logoLabel}>
                                    GITBOX
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                      disableUnderline: true,
                                    }}
                                    value={username}
                                    onChange={this.handleChange("username")}
                                    fullWidth
                                    placeholder="Username"
                                    className={classes.formInput}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                      disableUnderline: true,
                                    }}
                                    value={password}
                                    onChange={this.handleChange("password")}
                                    fullWidth
                                    type="password"
                                    placeholder="Password"
                                    className={classes.formInput}
                                    />
                            </Grid>
                            <Grid item>
                                <Button fullWidth variant="outlined" color="primary"
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
};

const mapStateToProps = (state) => {
  const {username, password} = state;

  return {
    username, password
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));