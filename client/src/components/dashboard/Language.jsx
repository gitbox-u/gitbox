import React from 'react';
import { withStyles } from '@material-ui/styles';
import Brightness from '@material-ui/icons/Brightness1';
import { Typography } from '@material-ui/core/es';

const styles = {
  back: {
    background: "#DCDCDC",
    borderRadius: 25,
    paddingRight: 8,
    display: "flex",
    // alignContent: "center",
  },

  inline: {
    // display: 'inline-block',
    margin: '3px',
  }
};

const Language = (props) => {
  const {colour, language, classes} = props;

  return (
    <div className={classes.back}>
      <Brightness style={{fill: colour, fontSize: 15}} className={classes.inline}></Brightness><Typography>{language}</Typography>
    </div>
  );
};


export default withStyles(styles)(Language);