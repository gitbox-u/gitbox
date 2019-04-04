import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Button, TextField, IconButton, Fab} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";
import { initUsers, filterUsers, updateSearch, updateUsername} from '../../reducers/users';
import AddIcon from '@material-ui/icons/Add';
import {removeUser, promoteUser, changeUser} from '../../api/api';

import AddUsers from './AddUser';



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
  },

  
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
  };

  handleSearch = e => {
    this.props.updateSearch(e.target.value);
  };

  removeUser = uuid => {
    removeUser(uuid)
    .then(msg => window.alert(msg.message))
    .then(() => window.location.reload());
  };

  promoteUser = (uuid, admin) => {
    promoteUser(uuid, admin)
    .then(msg => window.alert(msg.message))
    .then(() => window.location.reload());
  };

  changeUser = (uuid) => {
    const newName = window.prompt(`Enter new username for user ${uuid}`);
    if (newName === undefined || newName === null || newName.length === 0) {
      window.alert("Operation cancelled, username not valid");
    } else {
      changeUser(uuid, newName).then(
        msg => window.alert(msg.message)
      ).then(() => window.location.reload());
    }
  } 

  render() {
    const {classes} = this.props;
    const {expanded} = this.state;

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
            value={username}
          />
          <div className={classes.grow}></div>
          <AddUsers></AddUsers>

        </div>
        {
          users.map(
            user => (
              <ExpansionPanel expanded={expanded === user.uuid} onChange={this.handleChange(user.uuid)} key={user.uuid}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography className={classes.heading}>{user.user}</Typography>
                  <Typography className={classes.secondaryHeading}>{user.admin ? "Admin" : "User"} - {user.uuid}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Button variant="outlined" color="primary" onClick={() => this.changeUser(user.uuid)}
                          className={classes.button}>Edit Username</Button>
                  <Button variant="outlined" color="primary" onClick={() => this.removeUser(user.uuid)}
                          className={classes.button}>Remove User</Button>

                  {
                    user.admin ? 

                    <Button variant="outlined" color="primary" onClick={() => this.promoteUser(user.uuid, false)}
                    className={classes.button}>Demote User</Button>

                    :

                    <Button variant="outlined" color="primary" onClick={() => this.promoteUser(user.uuid, true)}
                    className={classes.button}>Promote User to Admin</Button>
                  }

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
  const {users, filter, username} = state.users;

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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Users));