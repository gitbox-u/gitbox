import React from 'react';
import {Card, Typography} from "@material-ui/core";
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
  },

  calendar: {
    width: '50vw',
    height: '25.5vh',
  },

  cardHeader: {
    textAlign: 'center',
    marginTop: '10px',
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
          justify='center'
    >
      <Grid item>
          
        <Card className={classes.languages}>
          <Typography variant="h6" className={classes.cardHeader}>
                Language Breakdown
          </Typography>
          <LangPie/>
        </Card>
      </Grid>


      <Grid item>
        <Card>
          <Typography variant="h6" className={classes.cardHeader}>
            %n Contributions over the last year
          </Typography>
            {/* TODO: get the number of contributions */}
          <Grid container
                direction='row'
                alignItems='center'
                justify='center'>
            <Grid item className={classes.calendar}>
              <Calendar/>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>

  );
}

export default withStyles(styles)(QuickStats);