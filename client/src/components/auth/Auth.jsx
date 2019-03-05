import React from 'react'
import {Grid, Paper, withStyles} from '@material-ui/core'
import {Route, withRouter} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

const styles = {
  formContainer: {
    position: 'relative',
    top: '-10%',
    padding: '50px 90px',
    margin: '10px',
    width: '350px',
  },

  formButton: {
    marginTop: '10px',
  },

  formInput: {
    marginTop: '5px',
    borderBottom: '1px solid black',
    padding: '0 5px',
  },

  logo: {
    width: 130
  },

  logoLabel: {
    letterSpacing: '0.1em'
  },

  blue: {
    backgroundColor: '#296bbb',
    height: '100%',
    minHeight: '700px',
  },

  height: {
    height: '100%',
  },
};

function Auth({classes}) {
  // useEffect(() => {
  //   try {
  //     geometric();
  //   } catch (e) {
  //     console.err("*hug* this background");
  //   }
  // });

  return (
    <div className={classes.blue}>
      {/*<div id="bg"/>*/}
      <Grid
        container
        alignItems="center"
        spacing={0}
        justify="center"
        direction="column"
        // style={{minHeight: '85vh'}}
        className={classes.height}
      >
        <Grid item>
          <Paper className={classes.formContainer}>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(withStyles(styles)(Auth));