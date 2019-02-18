import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Repositories from './repositories';


const style =
{
    dashboardSection: {
        maxWidth: '80%',
    }
};

class Dashboard extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item
                    container
                    spacing={16}
                    direction="column"
                    className={classes.dashboardColumn}
                >
                    <Grid item className={classes.dashboardSection}>
                        <Repositories>
                        </Repositories>
                    </Grid>
                    <Grid item className={classes.dashboardSection}></Grid>
                    <Grid item className={classes.dashboardSection}></Grid>

                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(withStyles(style)(Dashboard));
