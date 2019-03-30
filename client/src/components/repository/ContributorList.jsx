import React from 'react';
import {withStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Circle from '@material-ui/icons/Brightness1'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';

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
        <ListSubheader style={{backgroundColor: 'white'}}>{'Contributors'}</ListSubheader>
        {this.props.contributors.map((contributor, i) => ( // TODO: Change ALL keys to non-index values
          <ListItem key={i} button style={{minHeight: 100}}>
            <ListItemAvatar>
              <Circle style={{fill: contributor.color}}/>
            </ListItemAvatar>
            <ListItemText primary={contributor.name}
            secondary={'Secondary text'}/>
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


export default withStyles(styles)(ContributorList);