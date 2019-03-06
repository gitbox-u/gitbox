import React from 'react';
import {IconButton, Menu} from '@material-ui/core';
import {Notifications} from '@material-ui/icons'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import {connect} from 'react-redux';

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
    const {notifications} = this.props;

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
                <MenuItem key={i} onClick={this.handleClose}
                          style={{outline: 'none'}}>
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
)(NotificationMenu);