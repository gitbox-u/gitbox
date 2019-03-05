import React from 'react';
import { withStyles, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Mail from '@material-ui/icons/MailOutline'
import Badge from '@material-ui/core/Badge';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';


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

          <Badge badgeContent={4} color="secondary"><Mail ></Mail></Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
            //   maxHeight: ITEM_HEIGHT * 4.5,
              width: 400,
            },
}}
        >

          <MenuItem onClick={this.handleClose} style={{whiteSpace: 'normal', paddingTop: "40px", paddingBottom: "40px"}}>  
            <p>This song is just six words long. This song is just six words long.  This song is just six words long.  This song is just six words long.</p> 
          </MenuItem>

          <MenuItem onClick={this.handleClose} style={{whiteSpace: 'normal', paddingTop: "40px", paddingBottom: "40px"}}>  
            <p>This is a super short message</p> 
          </MenuItem>

          <MenuItem onClick={this.handleClose} style={{whiteSpace: 'normal', paddingTop: "40px", paddingBottom: "40px"}}>  
            <p> HULLLLLOO WHAT IS UP FJKSHKJFHSFHSJKFJNSCNSKJNFJKSFKJSDHDJK FJKSHFJSJKF FJSHFJKSFJK FSJHFKJS </p>
          </MenuItem>

          <MenuItem onClick={this.handleClose} style={{whiteSpace: 'normal', paddingTop: "40px", paddingBottom: "40px"}}>  
            <p>This song is just six words long. </p> 
          </MenuItem>
          {/* <MenuItem onClick={this.handleClose} style={{whiteSpace: 'normal'}}>

          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
          Lorem ipsum dolor sit amet, bibendum eros nec tortor penatibus turpis, vitae suspendisse mollit dictum in, sed blandit, aliquam convallis feugiat sit eros neque aenean. Wisi sapien lobortis convallis exercitationem, purus fusce eos. Ultricies pellentesque adipiscing vel,
          </Typography>
          
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Lorem ipsum dolor sit amet, bibendum eros nec tortor penatibus turpis, vitae suspendisse mollit dictum in, sed blandit, aliquam convallis feugiat sit eros neque aenean. Wisi sapien lobortis convallis exercitationem, purus fusce eos. Ultricies pellentesque adipiscing vel,
          </Typography>
          
          </MenuItem>


          <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Message Three
          </Typography>
          
          </MenuItem> */}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;