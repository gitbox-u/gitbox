import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class searchFields extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { one} = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Search Properties</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={one} 
                onChange={this.handleChange('Option 1')} 
                value="Option 1" />
              }
              label="Option 1"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

searchFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(searchFields);