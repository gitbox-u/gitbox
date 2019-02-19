
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    textField: {
        width: '100%'
    }
});


class searchbar extends React.Component {

    render() {
        const { classes } = this.props;

        return (

            <TextField
                placeholder="Search for a repo..."
                id="outlined-bare"
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
        );
    }
}


export default withStyles(styles)(searchbar);

