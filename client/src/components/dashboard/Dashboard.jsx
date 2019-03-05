import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Repositories from './RepoGrid';
import QuickStats from "./QuickStats";

const style =
  {
    dashboardContainer: {
      paddingTop: 100,
      width: '100%',
      backgroundColor: 'rgb(247,247,247)',
      margin: '0'
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

function Dashboard({classes}) {
  return (
    <Grid item
          container
          spacing={32}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.dashboardContainer}
    >

      <QuickStats/>

      <Grid item className={classes.repos}>
        <Repositories>
        </Repositories>
      </Grid>
    </Grid>
  );
}

export default withStyles(style)(Dashboard);
