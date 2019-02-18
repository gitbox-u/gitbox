import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Repos from "./dashboardRepos";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Header from "./header";


const style =
    {
        dashboardColumn: {
            minWidth: 200,

        },
        dashboardItem: {
            minHeight: 200,
        }
    };

class Dashboard extends Component {
    render() {
        const {classes} = this.props;

        return (
                <Grid container
                      spacing={0}
                      direction="column"
                      justify="center"
                      alignItems="center"
                      style={{
                          minHeight: '30vh',
                      }}
                >
                    <Grid item container
                          spacing={0}
                          direction="row"
                          justify="center"

                    >
                        <Grid item className={classes.dashboardColumn}>
                            <Repos className={classes.dashboardItem}/>
                        </Grid>
                        <Grid item>
                            <Repos/>
                        </Grid>
                    </Grid>

                    <Grid item container
                          spacing={0}
                          direction="row"
                          justify="center"
                    >
                        <Grid item>
                            <Repos/>
                        </Grid>
                        <Grid item>
                            <Repos/>
                        </Grid>
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
