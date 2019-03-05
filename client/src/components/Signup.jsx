import React from 'react'
import {Grid, Button, TextField, Typography, withStyles} from '@material-ui/core'
import logo from '../assets/logo.svg';

const styles = {
  formInput: {
    marginTop: '5px',
    borderBottom: '1px solid black',
    padding: '0 5px',
  },

  formButton: {
    marginTop: '10px',
  },

  logo: {
    width: 130
  },

  logoLabel: {
    letterSpacing: '0.1em'
  }
};

function Signup({classes}) {
  return (
    <Grid container
          direction="column"
          alignItems="center"
          spacing={8}
          justify="center">
      <Grid item>
        <img src={logo} className={classes.logo} alt="Gitmap"/>
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
          // value={username}
          // onChange={this.handleLoginChange("username")}
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
          // value={password}
          // onChange={this.handleLoginChange("password")}
          fullWidth
          type="password"
          placeholder="Password"
          className={classes.formInput}
        />
      </Grid>
      <Grid item>
        <TextField
          InputProps={{
            disableUnderline: true,
          }}
          // value={password}
          // onChange={this.handleLoginChange("password")}
          fullWidth
          type="password"
          placeholder="Confirm password"
          className={classes.formInput}
        />
      </Grid>
      <Grid item>
        <Button fullWidth variant="outlined" color="primary" onClick={console.log('TODO')}
                className={classes.formButton}>Register</Button>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Signup);