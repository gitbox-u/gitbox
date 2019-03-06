import React from 'react';
import {IconButton, Menu, withStyles} from '@material-ui/core';
import {Notifications} from '@material-ui/icons'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/ListItem';
import {connect} from 'react-redux';

const styles = {
  listItem: {
    outline: 'none',
    '&:hover': {
      backgroundColor: 'rgba(147, 147, 147, 0.1)',
    },
  },
};

class NotificationMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {anchorEl} = this.state;
    const {notifications, classes} = this.props;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={this.handleClick}
          color='inherit'
        >
          <Badge badgeContent={notifications.length} color='secondary'><Notifications/></Badge>
        </IconButton>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              width: 400,
              maxHeight: 500,
              overflowY: 'auto',
              overflowX: 'hidden',
            },
          }}
        >
          {
            notifications.map((n, i) => (
                <MenuItem key={i}
                          onClick={this.handleClose}
                          className={classes.listItem}
                          >
                  <p>{n.message}</p>
                </MenuItem>
              )
            )
          }
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({notifications: state.notifications});

export default connect(
  mapStateToProps,
)(withStyles(styles)(NotificationMenu));