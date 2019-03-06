import React from 'react';
import {Grid, TextField} from '@material-ui/core';

function New() {
  return (
    <Grid container
          direction='column'
          alignItems='center'
          spacing={8}
          justify='center'>
      <Grid item>
        <TextField
          InputProps={{
            disableUnderline: true,
          }}
          onChange={this.handleLoginChange('username')}
          fullWidth
          placeholder='Username'
          // className={classes.formInput}
        />
      </Grid>
      <Grid item>
        <TextField
          InputProps={{
            disableUnderline: true,
          }}
          fullWidth
          type='password'
          placeholder='Password'
          // className={classes.formInput}
        />
      </Grid>
      <Grid item>
        <Button fullWidth variant='outlined' color='primary' onClick={this.handleLogin}
                className={classes.formButton}>Login</Button>
        <Button fullWidth variant='outlined' color='primary' onClick={this.handleSignup}
                className={classes.formButton}>Register</Button>
      </Grid>
    </Grid>
  )
}

export default New;