import React, {Component} from 'react';
import {withStyles, Button, Grid, Typography} from '@material-ui/core';

const styles = {
    repoViewContainer: {
        paddingTop: 100
    }

};

class Repository extends Component {

    getData = () => {
        const id = this.props.match.params.id;
        return {
            name: `Repository #${id}`
        }
    };

    render() {
        // Temporary
        console.log("repo");

        const data = this.getData();

        const { classes } = this.props;

        return (
            <Grid item
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                  spacing={16}
                  direction="column"
                  className={classes.repoViewContainer}
            >
                <Grid item>
                    <Typography variant="h3">
                        {data.name}
                    </Typography>

                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Repository);