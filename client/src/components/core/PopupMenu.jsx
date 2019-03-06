import React from 'react';
import {IconButton} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Mail from '@material-ui/icons/MailOutline'
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import {connect} from 'react-redux';

class SimpleMenu extends React.Component {
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
    const {classes} = this.props;

    return (
      <div>

        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={this.handleClick}
          color='inherit'
        >

          <Badge badgeContent={4} color='secondary'><Mail></Mail></Badge>
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
          }} // TODO: Map notifications to menu
        >
          <ListSubheader style={{backgroundColor: 'white'}}>{'Notifications'}</ListSubheader>
          <ListItem onClick={this.handleClose}
                    style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
            <p>This song is just six words long. This song is just six words long. This song is just six words long.
              This song is just six words long.</p>
          </ListItem>

          <ListItem onClick={this.handleClose}
                    style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
            <p>This is a super short message</p>
          </ListItem>

          <ListItem onClick={this.handleClose}
                    style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
            <p> HULLLLLOO WHAT IS UP FJKSHKJFHSFHSJKFJNSCNSKJNFJKSFKJSDHDJK FJKSHFJSJKF FJSHFJKSFJK FSJHFKJS </p>
          </ListItem>

          <ListItem onClick={this.handleClose}
                    style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
            <p>This song is just six words long. </p>
          </ListItem>

          <ListItem onClick={this.handleClose}
                    style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
            <p>This song is just six words long. This song is just six words long. This song is just six words long.
              This song is just six words long.</p>
          </ListItem>

          <ListItem onClick={this.handleClose}
                    style={{width: '380px', whiteSpace: 'normal', paddingTop: '5px', paddingBottom: '5px'}}>
            <p>This song is just six words long. This song is just six words long. This song is just six words long.
              This song is just six words long.</p>
          </ListItem>
          {/* <MenuItem onClick={this.handleClose} style={{whiteSpace: 'normal'}}>

          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography variant='inherit' noWrap>
          Lorem ipsum dolor sit amet, bibendum eros nec tortor penatibus turpis, vitae suspendisse mollit dictum in, sed blandit, aliquam convallis feugiat sit eros neque aenean. Wisi sapien lobortis convallis exercitationem, purus fusce eos. Ultricies pellentesque adipiscing vel,
          </Typography>
          
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography variant='inherit' noWrap>
            Lorem ipsum dolor sit amet, bibendum eros nec tortor penatibus turpis, vitae suspendisse mollit dictum in, sed blandit, aliquam convallis feugiat sit eros neque aenean. Wisi sapien lobortis convallis exercitationem, purus fusce eos. Ultricies pellentesque adipiscing vel,
          </Typography>
          
          </MenuItem>


          <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography variant='inherit' noWrap>
            Message Three
          </Typography>
          
          </MenuItem> */}
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.notifications;
}

export default connect(
  mapStateToProps,
)(SimpleMenu);