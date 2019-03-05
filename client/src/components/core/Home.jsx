import React from 'react';
import { Typography } from "@material-ui/core";
import { Grid } from '@material-ui/core/es';
import { withStyles } from '@material-ui/styles';

import logo from '../../assets/logo.svg';


const styles = {
  fullHeight: {
    height: '100%',
  },

  logo: {
    width: 200,
  }
};

const Home = (props) => {
  const { classes } = props;
  return (
    <Grid
      container
      alignItems="center"
      spacing={32}
      justify="center"
      direction="column"
      className={classes.fullHeight}
    >
      <Grid item>
        <img src={logo} className={classes.logo} alt='Gitmap' />
      </Grid>
      <Grid item>
        <Typography variant={"h2"} className="logo active">
          Welcome to GITBOX
        </Typography>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Home);