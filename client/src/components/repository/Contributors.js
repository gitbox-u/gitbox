import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ContributorCard from "./ContributorCard";


const styles = {
  contributors: {
    height: '80vh',
    width: '30vh',
  },

};


class Contributors extends Component {
  render() {
    const {classes} = this.props;


    return (
      <Grid item className={classes.contributors}>
        {
          this.props.contributors.map((contributor) => (
            <ContributorCard data={contributor}/>
          ))
        }

      </Grid>
    );
  }
}


export default withStyles(styles)(Contributors);