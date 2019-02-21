import React from 'react';
import {withStyles} from '@material-ui/styles';
import {Card, CardHeader} from '@material-ui/core';


const styles = {
  repoCard: {
    width: 250,
    height: 220,
    padding: 24,
  },
}

function Repository(props) {
  const {classes} = props;

  const {name, desc} = props;

  return (
    <Card className={classes.repoCard}>
      <CardHeader
        title={
          `${name}`
        }
        subheader={`${desc}`}
      />
    </Card>
  );
}

export default withStyles(styles)(Repository);

