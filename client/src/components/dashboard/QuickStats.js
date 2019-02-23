import React from 'react';
import {Card} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import LangPie from "./LangPie";
import Calendar from "./Calendar";
import Grid from "@material-ui/core/Grid";


const styles = {
  quickStats: {
    // width: '70%',
    height: 200,
    // padding: 24,
  },

  languages: {
    height: '100%',
    width: '30%',
    // padding: '50px 0'
  },

  calendar: {
    height: '70%',
    width: '70%',
    // padding: '15% 0',
  },

  container: {
    height: '100%',
    width: '100%',
  }
};


function QuickStats(props) {
  const {classes} = props;


  return (
    <Card className={classes.quickStats}>
      <Grid container
            direction="column"
            spacing={0}
            className={classes.container}
      >
        <Grid item className={classes.languages}>
          <LangPie/>
        </Grid>

        <Grid item className={classes.calendar}>
          <Calendar/>
        </Grid>


      </Grid>

    </Card>

  );
}

QuickStats.propTypes = {};

export default withStyles(styles)(QuickStats);