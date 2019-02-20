import React, {Component} from 'react';
import {withStyles, Button, Grid, Typography} from '@material-ui/core';
import CodeStream from "./CodeStream";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Contributors from "./Contributors";

const styles = {
    repoViewContainer: {
        paddingTop: 100,
        paddingLeft: 100
    },

    codeStream: {
        height: '30vh',
        width: '40vw',
        marginBottom: '2vh'
    },

    repoName: {},

    contributors: {
        height: '80vh',
        width: '30vh',
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
                  alignItems="left"
                  justify="center"
                  spacing={16}
                  direction="column"
                  className={classes.repoViewContainer}
            >
                <Grid item>
                    <Typography className={classes.repoName} variant="h4">
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item
                      container
                      direction="row"
                      spacing={16}
                >

                    <Grid item
                          direction="column"
                          spacing={16}
                    >
                        <Grid item>
                            <Paper className={classes.codeStream}>
                                <CodeStream stats={data.stats} contributors={data.contributors}/>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper className={classes.codeStream}>
                                <CodeStream stats={data.stats} contributors={data.contributors}/>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid item >
                        <Contributors contributors={data.contributors}/>
                    </Grid>

                </Grid>


            </Grid>
        );
    }
}

export default withStyles(styles)(Repository);