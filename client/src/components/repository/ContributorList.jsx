import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, Typography} from '@material-ui/core';
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
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class ContributorList extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const {checked} = this.state;
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
    const {classes} = this.props;

    return (
      <List dense className={classes.root}>
        {this.props.contributors.map(contributor => (
          <ListItem key={contributor} button style={{minHeight: 100}}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${contributor}`}
                src={`/static/images/avatar/${contributor + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText primary={contributor.name}/>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(contributor)}
                checked={this.state.checked.indexOf(contributor) !== -1}
              />
            </ListItemSecondaryAction>
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
ContributorList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContributorList);