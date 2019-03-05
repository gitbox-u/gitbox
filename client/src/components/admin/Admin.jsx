import React, {Component} from 'react';
import {Grid, TextField} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Users from './Users'

const style =
  {
    adminContainer: {
      paddingTop: 100,
      width: '90%',
    },

    adminSection: {
    },

    button: {
      margin: '5px 0',
    }
  };

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
    };
  }

  add = () => {
    console.log(this);
    this.setState({
      adding: true
    });
  };

  render() {
    const {classes, search} = this.props;

    return (
      <Grid item
            container
            spacing={16}
            justify="center"
            className={classes.adminContainer}
      >
        <Grid item className={classes.adminSection}>
          <Users/>
        </Grid>

        <Grid item>
          {this.state.adding ?
            <TextField
              placeholder="Username"
              id="outlined-bare"
              margin="normal"
              variant="outlined"
              // value={search}
              // onChange={console.log(this)}
              // className={classes.textInput}
            /> : null}
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(style)(Admin);
