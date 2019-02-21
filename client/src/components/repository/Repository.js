import React, {Component} from 'react';
import {withStyles, Button, Grid, Typography} from '@material-ui/core';
import CodeStream from "./CodeStream";
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
        {
          key: "1",
          name: "Murad",
          commits: 300,
          additions: 2000,
          deletions: 400
        },
        {
          key: "2",
          name: "Eric",
          commits: 300,
          additions: 2000,
          deletions: 400
        },
        {
          key: "3",
          name: "Lin",
          commits: 300,
          additions: 2000,
          deletions: 400
        },
        {
          key: "4",
          name: "Howard",
          commits: 300,
          additions: 2000,
          deletions: 400
        },
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
    const data = this.getData();

    const {classes} = this.props;

    const contributorNames = data.contributors.map((c) => c.name);

    return (

      <Grid item
            container
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
          >
            <Grid item>
              <Paper className={classes.codeStream}>
                <CodeStream stats={data.stats} contributors={contributorNames}/>
              </Paper>
            </Grid>

            <Grid item>
              <Paper className={classes.codeStream}>
                <CodeStream stats={data.stats} contributors={contributorNames}/>
              </Paper>
            </Grid>
          </Grid>

          <Grid item>
            <Contributors contributors={data.contributors}/>
          </Grid>

        </Grid>


      </Grid>
    );
  }
}

export default withStyles(styles)(Repository);