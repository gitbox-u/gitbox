import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from "react-redux";

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
});

class Users extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const users = this.props.users;

    return (
      <div className={classes.root}>
        {
          users.map(
            user => (
              <ExpansionPanel expanded={expanded === user.username} onChange={this.handleChange(user.username)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{user.username}</Typography>
                  <Typography className={classes.secondaryHeading}>{user.repos} repos - {user.commits} commits</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    info about user
                  </Typography>
                  <Button variant="outlined" color="primary" onClick={this.handleSubmit}
                          className={classes.formButton}>Edit User</Button>
                  <Button variant="outlined" color="primary" onClick={this.handleSubmit}
                          className={classes.formButton}>Message User</Button>
                  <Button variant="outlined" color="primary" onClick={this.handleSubmit}
                          className={classes.formButton}>Block User</Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Users));