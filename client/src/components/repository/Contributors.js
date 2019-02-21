import React from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ContributorCard from "./ContributorCard";


const styles = {
  contributors: {
    height: '80vh',
    width: '30vh',
  },

};


function Contributors(props) {
  const {classes} = props;


  return (
    <Grid item className={classes.contributors}>
      {
        props.contributors.map((contributor) => (
          <ContributorCard data={contributor} key={contributor.name}/>
        ))
      }

    </Grid>
  );
}


export default withStyles(styles)(Contributors);