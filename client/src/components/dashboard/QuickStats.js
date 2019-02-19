import React, {Component, PureComponent} from 'react';
import {Card, CardHeader} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";


const styles = {
    quickStats: {
        minWidth: '80vw',
        height: 180,
        padding: 24,
    },
};


class QuickStats extends Component {
    render() {
        const { classes } = this.props;


        return (
            <Card className={classes.quickStats}>
                <CardHeader
                    title={
                        `Quick Stats`
                    }
                    subheader="Lorum ipsum blah blab some words here."
                />
            </Card>

        );
    }
}

QuickStats.propTypes = {};

export default withStyles(styles)(QuickStats);