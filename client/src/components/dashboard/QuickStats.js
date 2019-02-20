import React, {Component, PureComponent} from 'react';
import {Card, CardHeader} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import LangPie from "./LangPie";


const styles = {
    quickStats: {
        minWidth: '80vw',
        height: 180,
        padding: 24,
    },

    languages: {
        height: 200
    }
};


class QuickStats extends Component {
    render() {
        const {classes} = this.props;


        return (
            <Card className={classes.quickStats}>
                <div className={classes.languages}>
                    <LangPie />
                </div>
            </Card>

        );
    }
}

QuickStats.propTypes = {};

export default withStyles(styles)(QuickStats);