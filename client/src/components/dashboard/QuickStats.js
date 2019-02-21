import React from 'react';
import {Card} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import LangPie from "./LangPie";


const styles = {
  quickStats: {
    minWidth: '80vw',
    height: 180,
    padding: 24,
  },

  languages: {
    height: 200
  }
};


function QuickStats(props) {
  const {classes} = props;


  return (
    <Card className={classes.quickStats}>
      <div className={classes.languages}>
        <LangPie/>
      </div>
    </Card>

  );
}

QuickStats.propTypes = {};

export default withStyles(styles)(QuickStats);