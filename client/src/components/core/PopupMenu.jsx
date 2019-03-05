import React from 'react';
import { withStyles, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Mail from '@material-ui/icons/MailOutline'
import Badge from '@material-ui/core/Badge';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


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
              maxHeight: 500,
              overflowY: 'auto',
              overflowX: 'hidden',

            },
}}
        >

        
    
          <ListSubheader style={{backgroundColor:'white'}}>{'Notifications'}</ListSubheader>
          <ListItem onClick={this.handleClose} style={{width: "380px", whiteSpace: 'normal', paddingTop: "5px", paddingBottom: "5px"}}>  
            <p>This song is just six words long. This song is just six words long.  This song is just six words long.  This song is just six words long.</p> 
          </ListItem>

          <ListItem onClick={this.handleClose} style={{width: "380px",whiteSpace: 'normal', paddingTop: "5px", paddingBottom: "5px"}}>  
            <p>This is a super short message</p> 
          </ListItem>

          <ListItem onClick={this.handleClose} style={{width: "380px",whiteSpace: 'normal', paddingTop: "5px", paddingBottom: "5px"}}>  
            <p> HULLLLLOO WHAT IS UP FJKSHKJFHSFHSJKFJNSCNSKJNFJKSFKJSDHDJK FJKSHFJSJKF FJSHFJKSFJK FSJHFKJS </p>
          </ListItem>

          <ListItem onClick={this.handleClose} style={{width: "380px",whiteSpace: 'normal', paddingTop: "5px", paddingBottom: "5px"}}>  
            <p>This song is just six words long. </p> 
          </ListItem>

          <ListItem onClick={this.handleClose} style={{width: "380px",whiteSpace: 'normal', paddingTop: "5px", paddingBottom: "5px"}}>  
            <p>This song is just six words long. This song is just six words long.  This song is just six words long.  This song is just six words long.</p> 
          </ListItem>

          <ListItem onClick={this.handleClose} style={{width: "380px",whiteSpace: 'normal', paddingTop: "5px", paddingBottom: "5px"}}>  
            <p>This song is just six words long. This song is just six words long.  This song is just six words long.  This song is just six words long.</p> 
          </ListItem>
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