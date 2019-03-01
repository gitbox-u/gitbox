import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Repositories from './Repos';
import QuickStats from "./QuickStats";

const style =
  {
    dashboardContainer: {
      paddingTop: 100,
      backgroundColor: 'rgb(247,247,247)'
    },

    stats: {
      width: '80%',
      maxWidth: '1000px',
    },

    repos: {
      width: '90%',
      maxWidth: '3000px',
      display: 'flex',
      alignItems: 'center'
    },

    repoHeader: {
      marginTop: 60
    }
  };

function Dashboard(props) {
  const {classes} = props;

  return (
    <Grid item
          container
          spacing={32}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.dashboardContainer}
    >

      <Grid item className={classes.stats}>
        <QuickStats/>
      </Grid>

      <Grid item className={classes.repos}>
        <Repositories>
        </Repositories>
      </Grid>
    </Grid>
  );
}

export default withStyles(style)(Dashboard);
