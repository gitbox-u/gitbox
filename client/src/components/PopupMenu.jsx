import React from 'react';
import { withStyles, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Mail from '@material-ui/icons/MailOutline'
import Badge from '@material-ui/core/Badge';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div>

        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >

          <Badge badgeContent={99} color="secondary"><Mail ></Mail></Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
            //   maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
}}
        >
          <MenuItem onClick={this.handleClose}>Messages</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;