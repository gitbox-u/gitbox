import React from 'react'
import {Paper, Typography, withStyles} from '@material-ui/core'

const styles = {

};

function Stat(props) {
  return (
    <Paper>
      {/*<Typography variant="h5" component="h3">*/}
        {/*{title}*/}
      {/*</Typography>*/}
      {/*{props.children}*/}
    </Paper>
  )
}

export default withStyles(styles)(Stat);