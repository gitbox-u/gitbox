import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, IconButton } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from "react-redux";
import { addUser, removeUser, initUsers, filterUsers, updateSearch, updateUsername } from '../../reducers/users';


import Add from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  button: {
    margin: '0 10px',
  },

  topbar: {
    display: "flex",
    alignContent: "center",
  },

  grow: {
    flexGrow: 1,
  }
});

class Users extends Component {
  state = {
    expanded: null,
  };

  componentDidMount() {
    this.props.initUsers();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleUsername = (e) => {
    this.props.updateUsername(e.target.value);
  }

  addUser = (e) => {
    this.props.addUser();
  }

  handleSearch = e => {
    this.props.updateSearch(e.target.value);
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const {username, users} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.topbar}>
          <TextField
            placeholder="Search for a user..."
            id="outlined-bare"
            margin="normal"
            variant="outlined"
            onChange={this.handleSearch}
            className={classes.textInput}
          />
          <div className={classes.grow}></div>
          <TextField
            placeholder="New user..."
            id="outlined-bare"
            margin="normal"
            variant="outlined"
            value={username}
            className={classes.textInput}
          />
          <IconButton onClick={this.addUser}>
            <Add></Add>
          </IconButton>
        </div>
        {
          users.map(
            user => (
              <ExpansionPanel expanded={expanded === user.id} onChange={this.handleChange(user.id)} key={user.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{user.username}</Typography>
                  <Typography className={classes.secondaryHeading}>{user.repos} repos - {user.commits} commits</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Button variant="outlined" color="primary" onClick={this.handleSubmit}
                    className={classes.button}>Edit User</Button>
                  <Button variant="outlined" color="primary" onClick={this.handleSubmit}
                    className={classes.button}>Message User</Button>
                  <Button variant="outlined" color="primary" onClick={this.handleSubmit}
                    className={classes.button}>Block User</Button>
                  <Button variant="outlined" color="primary" onClick={() => this.props.removeUser(user.id)}
                    className={classes.button}>Remove User</Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { users, filter, username } = state.users;

  return {
    users: filterUsers(users, filter),
    username,
  };
};

const mapDispatchToProps = {
  removeUser,
  initUsers,
  updateSearch,
  updateUsername,
  addUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Users));