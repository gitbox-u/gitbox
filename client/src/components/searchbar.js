
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
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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
      id="outlined-bare"
      className={classes.textField}
      defaultValue="Search for a repo..."
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

