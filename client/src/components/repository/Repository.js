import React, {Component} from 'react';
import {withStyles, Button, Grid, Typography} from '@material-ui/core';
import CodeStream from "./CodeStream";

const styles = {
    repoViewContainer: {
        paddingTop: 100
    },

    codeStream: {
        height: '60vh',
        width: '70vw'
    }

};

class Repository extends Component {

    getData = () => {
        const id = this.props.match.params.id;
        return {
            name: `Repository #${id}`,
            contributors: [
                "Murad",
                "Eric",
                "Lin",
                "Howard"
            ],
            stats: [
                {
                    "Murad": 93,
                    "Eric": 155,
                    "Lin": 20,
                    "Howard": 135,

                },
                {
                    "Murad": 42,
                    "Eric": 4,
                    "Lin": 57,
                    "Howard": 140,

                },
                {
                    "Murad": 170,
                    "Eric": 44,
                    "Lin": 2,
                    "Howard": 77,

                },
                {
                    "Murad": 55,
                    "Eric": 4,
                    "Lin": 140,
                    "Howard": 65,

                }
            ]
        }
    };

    render() {
        // Temporary
        console.log("repo");

        const data = this.getData();

        const {classes} = this.props;

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

                <Grid item className={classes.codeStream}>
                    <CodeStream stats={data.stats} contributors={data.contributors}/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Repository);