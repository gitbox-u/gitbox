import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Repository from './repo-snippet';

class Repositories extends Component {
    render() {
        // temp
        const repos = [
            1, 2, 3, 4, 5, 6, 7, 8, 9,
            1, 2, 3, 4, 5, 6, 7, 8, 9,
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ];

        return (
            <Grid container
                spacing={32}
                justify="center"
                alignContent="center"
            >
                {
                    repos.map(
                        id => (
                            <Grid item>
                                <Repository name={id}/>
                            </Grid>
                        )
                    )
                }
            </Grid>
        );
    }
}

export default Repositories;