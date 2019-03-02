import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 340,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class ContibutorsList extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <List dense className={classes.root} style={{maxHeight: 400, overflow: 'auto'}}>
        {[0, 1, 2, 3, 4, 5].map(value => (
          <ListItem key={value} button style={{minHeight: 100}}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(value)}
                checked={this.state.checked.indexOf(value) !== -1}
              />
            </ListItemSecondaryAction>

            {/* <Typography component="p">
            Paper can be used to build surface or other elements for your application.
            </Typography> */}
          </ListItem>
        ))}
      </List>
    );
  }
}

// function ContibutorsList(props) {
//   const { classes } = props;

//   return (
//     <List className={classes.root} subheader={<li />}>
//       {/* {[0, 1, 2, 3, 4].map(sectionId => (
//         <li key={`section-${sectionId}`} className={classes.listSection}>
//           <ul className={classes.ul}>
//             <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
//             {[0, 1, 2].map(item => (
//               <ListItem key={`item-${sectionId}-${item}`}>
//                 <ListItemText primary={`Item ${item}`} />
//               </ListItem>
//             ))}
//           </ul>
//         </li>
//       ))} */}

      
//     </List>
//   );
// }

// ContibutorsList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ContibutorsList);
ContibutorsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContibutorsList);