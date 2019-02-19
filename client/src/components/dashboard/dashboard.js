import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Repositories from './repos';


const style =
{
    dashboardContainer: {
        paddingTop: 100,
    },
    dashboardSection: {
        maxWidth: '80%',
    },
};

class Dashboard extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    spacing={36}
                    className={classes.dashboardContainer}
                >
                    <Grid item className={classes.dashboardSection}>
                        <Repositories />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(withStyles(style)(Dashboard));
