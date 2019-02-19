
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 40,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
    }

});


class searchbar extends React.Component {
    handleChange = name => event => {
    this.setState({
    [name]: event.target.value,
    });
};

render() {
    const { classes } = this.props;
    const {search} = this.props;

return (
  <Grid
    container
    alignItems="center"
    spacing={0}
    justify="center"
    direction="column"
  >

  <form className={classes.container} noValidate autoComplete="off">

  <TextField
    onChange={this.handleChange("search")}
    placeholder="Search for a repo..."
    className={classes.formInput}
    id="outlined-bare"
    className={classes.textField}
    margin="normal"
    variant="outlined"
  />
  </form>
  </Grid>
);
}
}

searchbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(searchbar);

