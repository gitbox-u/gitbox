import React from 'react';
import {IconButton} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Mail from '@material-ui/icons/MailOutline'
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
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
          <Badge badgeContent={notifications.length} color='secondary'><Mail/></Badge>
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
          <ListSubheader style={{backgroundColor: 'white'}}>{'Notifications'}</ListSubheader>
          {
            notifications.map((n, i) => (
                <ListItem key={i} onClick={this.handleClose}
                          style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
                  <p>{n.message}</p>
                </ListItem>
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