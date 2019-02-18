import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Repository from './repository';

class Repositories extends Component {
    render() {
        // temp
        const repos = [
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ];

        return (
            <Grid container
                direction="row"
                spacing={32}
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