import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

class DashboardRepos extends Component {
    render() {
        return (
            <Paper>
               <Typography type="h4">
                   Repositories
               </Typography>
            </Paper>
        );
    }
}

export default DashboardRepos;