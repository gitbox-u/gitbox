import React from 'react';
import {Card} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import LangPie from "./LangPie";
import Calendar from "./Calendar";
import Grid from "@material-ui/core/Grid";


const styles = {
  container: {
    width: '80vw',
    height: '30vh',
    padding: 24,
    marginBottom: '5vh'
  },

  languages: {
    width: '18vw',
    height: '30vh',
    // padding: '50px 0'
  },

  calendar: {
    width: '50vw',
    height: '30vh',
  },

};


function QuickStats(props) {
  const {classes} = props;


  return (
    <Grid item container
          direction="row"
          spacing={16}
          className={classes.container}
          alignItems='center'
    >
      <Grid item>
        <Card className={classes.languages}>
          <LangPie/>
        </Card>
      </Grid>


      <Grid item>
        <Card className={classes.calendar}>
          <Calendar/>
        </Card>
      </Grid>
    </Grid>

  );
}

QuickStats.propTypes = {};

export default withStyles(styles)(QuickStats);