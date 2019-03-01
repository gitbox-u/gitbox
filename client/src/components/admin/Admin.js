import React, { Component } from 'react';
import {Grid, TextField} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Users from './Users'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import SearchFields from './searchFields';

const style =
  {
    adminContainer: {
      paddingTop: 100,
      width: '90%',
    },

    adminSection: {
      // width: '90%',
      // width: '40%',
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

    this.add = this.add.bind(this);
  }

  add() {
    console.log(this);
    this.setState({
      adding: true
    });
  }

  render() {
    const {classes, search} = this.props;

    return (
      <Grid item
            container
            spacing={16}
        // direction="column"
        // alignItems="center"
            justify="center"
            className={classes.adminContainer}
      >

        <Grid item className={classes.adminSection}>
        <Grid item>
          <TextField
            placeholder="Search for a user..."
            id="outlined-bare"
            margin="normal"
            variant="outlined"
            value={search}
            onChange={this.handleChange}
            className={classes.textInput}
          />
        </Grid>

          <Grid item>
            <SearchFields></SearchFields>
          </Grid>
        </Grid>

        <Grid item className={classes.adminSection}>
          <Users/>
        </Grid>

        <Grid item>
          {/* <Fab size="small" color="secondary" aria-label="Add" className={classes.button} onClick={this.add}>
            <AddIcon/>
          </Fab> */}
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
