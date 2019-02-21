import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Typography} from "@material-ui/core";
import SearchFields from "./searchFields";
import ExpansionList from "./expansionList";
const style =
  {
    adminContainer: {
      paddingTop: 100,
      
    },

    adminSection: {
      width: '80%'
    },

  };

function Admin(props) {
  const {classes} = props;

  return (
    <Grid item
          container
          spacing={32}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.adminContainer}
    >

      <Grid item className={classes.adminSection}>
      <Grid item>
          <SearchFields></SearchFields>
        </Grid>
      </Grid>

      <Grid item className={classes.adminSection}>
      <ExpansionList></ExpansionList>
      </Grid>
    </Grid>
  );
}

export default withStyles(style)(Admin);
