import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {IconButton, Menu, withStyles} from '@material-ui/core';
import {Notifications} from '@material-ui/icons'
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <IconButton
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            color='inherit'
          >
            <Badge badgeContent={2} color='secondary'><Notifications/></Badge>
          </IconButton>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                  
                    <MenuList> 
                      <MenuItem onClick={this.handleClose}>notifcation 1</MenuItem>
                      <MenuItem onClick={this.handleClose}>notification 2</MenuItem>
                      <MenuItem onClick={this.handleClose}>notification 3</MenuItem>
                    </MenuList>
                            
                    
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);

// import React from 'react';
// import {IconButton, Menu, withStyles} from '@material-ui/core';
// import {Notifications} from '@material-ui/icons'
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/ListItem';
// import {connect} from 'react-redux';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';

// const styles = {
//   listItem: {
//     outline: 'none',
//     '&:hover': {
//       backgroundColor: 'rgba(147, 147, 147, 0.1)',
//     },
//   },
// };

// class NotificationMenu extends React.Component {
//   state = {
//     anchorEl: null,
//   };

//   handleClick = event => {
//     this.setState({anchorEl: event.currentTarget});
//   };

//   handleClose = () => {
//     this.setState({anchorEl: null});
//   };

//   render() {
//     const {anchorEl} = this.state;
//     const {notifications, classes} = this.props;

//     return (
//       <div>
//         <IconButton
//           aria-owns={anchorEl ? 'simple-menu' : undefined}
//           aria-haspopup='true'
//           onClick={this.handleClick}
//           color='inherit'
//         >
//           <Badge badgeContent={notifications.length} color='secondary'><Notifications/></Badge>
          
//         </IconButton>


//         <Menu
//           id='simple-menu'
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={this.handleClose}
//           PaperProps={{
//             style: {
//               width: 400,
//               maxHeight: 500,
//               overflowY: 'auto',
//               overflowX: 'hidden',
//             },
//           }}
//         >
//           {
//             notifications.map((n, i) => (
//                 <MenuItem key={i}
//                           onClick={this.handleClose}
//                           className={classes.listItem}
//                           >
//                   <p>{n.message}</p>
//                 </MenuItem>
//               )
//             )
//           }
//         </Menu>


//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({notifications: state.notifications});

// export default connect(
//   mapStateToProps,
// )(withStyles(styles)(NotificationMenu));