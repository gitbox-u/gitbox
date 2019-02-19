import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Repositories from './repos';
import QuickStats from "./QuickStats";
import SearchBar from "./searchbar"
import { Typography } from "@material-ui/core";

const style =
{
    dashboardContainer: {
        paddingTop: 100,
    },
    dashboardSection: {
        maxWidth: '80%',
    },

    repoHeader: {
        marginTop: 60
    }
};

class Dashboard extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid item
                container
                spacing={16}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.dashboardContainer}
            >

                <Grid item className={classes.dashboardSection}>
                    <QuickStats />
                </Grid>


                <Grid item className={[classes.dashboardSection, classes.repoHeader]}>
                    <Typography variant="h4">
                        Repositories
                    </Typography>
                </Grid>


                <Grid item className={classes.dashboardSection}>
                    <SearchBar />
                </Grid>


                <Grid item className={classes.dashboardSection}>
                    <Repositories>
                    </Repositories>
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
