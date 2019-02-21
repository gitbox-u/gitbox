import React from 'react';
import {Card} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import LangPie from "./LangPie";
import Calendar from "./Calendar";
import Grid from "@material-ui/core/Grid";


const styles = {
  quickStats: {
    minWidth: '80vw',
    height: 400,
    padding: 24,
  },

  languages: {
    height: 300,
    width: 300,
  },

  calendar: {
    height: 600,
    width: 600
  }
};


function QuickStats(props) {
  const {classes} = props;


  return (
    <Card className={classes.quickStats}>
      <Grid container
            direction="row"
            spacing={0}
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