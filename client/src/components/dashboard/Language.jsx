import React from 'react';
import { withStyles } from '@material-ui/styles';
import Brightness from '@material-ui/icons/Brightness1';
import { Typography } from '@material-ui/core/es';

const styles = {
  back: {
    background: "lightgrey",
    borderRadius: '10px',
    padding: 2,
    display: "flex",
    alignContent: "center",
  },

  inline: {
    display: 'inline-block',
  }
};

const Language = (props) => {
  const {colour, language, classes} = props;

  return (
    <div className={classes.back}>
      <Brightness style={{fill: colour}} className={classes.inline}></Brightness><Typography className={classes.inline}>{language}</Typography>
    </div>
  );
}


export default withStyles(styles)(Language);