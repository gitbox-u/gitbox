import React, { Component } from 'react';
import { withStyles, Button, Grid } from '@material-ui/core';

const styles = {

};

class Repository extends Component {
  render() {
    // Temporary
    return <Grid container
          direction="column"
          alignItems="center"
          justify="center"
    >
      {this.props.match.params.name}
    </Grid>
  }
}

export default withStyles(styles)(Repository);