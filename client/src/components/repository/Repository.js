import React, { Component } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import CodeStream from "./CodeStream";
import Paper from "@material-ui/core/Paper";
import Contributors from "./Contributors";
import LanguageBreakdown from "./LanguageBreakdown";
import FolderTree from "./FolderTree";
import GitGraph from './GitGraph';
import List from "./ContibutorList"

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

  gitGraph: {
    width: '80vw',
    height: '200px',
  },

  repoName: {},

  contributors: {
    height: '80vh',
    width: '30vh',
  },

  langBreak: {
    width: '40vh',
    height: '40vh'
  }

};

class Repository extends Component {
  state = {
    data: {
      name: "",
      contributors: [
        {
          name: "",
          commits: 0,
          additions: 0,
          deletions: 0
        }
      ],
      stats: [
        { "": 0 }
      ],
      languages: {}
    }
  };

  // Replace with server call
  getData = () => {
    const id = this.props.match.params.id;
    return {
      name: id,
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
      ],
      languages: {
        "name": "language",
        "children": [
          {
            "name": "C++",
            "children": [
              {
                "name": "address.cpp",
                "lines": 72594
              },
              {
                "name": "city.cpp",
                "lines": 137732
              },
              {
                "name": "anima.cpp",
                "lines": 81132
              },
              {
                "name": "movie.cpp",
                "lines": 146492
              },
              {
                "name": "user.cpp",
                "lines": 49485
              }
            ]
          },
          {
            "name": "javascript",
            "children": [
              {
                "name": "clone.js",
                "lines": 48385
              },
              {
                "name": "shuffle.js",
                "lines": 116587
              },
              {
                "name": "pick.js",
                "lines": 102176
              },
              {
                "name": "plouc.js",
                "lines": 136373
              }
            ]
          },
          {
            "name": "java",
            "children": [
              {
                "name": "main.java",
                "lines": 35993
              },
              {
                "name": "hello.java",
                "lines": 146986
              },
              {
                "name": "a.java",
                "lines": 58568
              },
              {
                "name": "sa.java",
                "lines": 83987
              },
              {
                "name": "repeat.java",
                "lines": 138659
              },
              {
                "name": "padLeft.java",
                "lines": 22276
              },
              {
                "name": "padRight.java",
                "lines": 178134
              },
              {
                "name": "sanitize.java",
                "lines": 99550
              },
              {
                "name": "ploucify.java",
                "lines": 392
              }
            ]
          },
          {
            "name": "other",
            "children": [
              {
                "name": "json",
                "lines": 113195
              }
            ]
          }
        ]
      }
    }
  };


  componentDidMount() {
    this.setState({ data: this.getData() });
  }

  render() {
    const data = this.state.data;

    const { classes } = this.props;

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
            {`Repository ${data.name}`}
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.gitGraph}>
            <GitGraph>
            </GitGraph>
          </Paper>
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
                <CodeStream stats={data.stats} contributors={contributorNames} />
              </Paper>
            </Grid>

            <Grid item>
              <Paper className={classes.codeStream}>
                <FolderTree data={data.languages} />
              </Paper>
            </Grid>
          </Grid>

          <Grid item
          >
            <Grid item>
              <Paper className={classes.langBreak}>
                <LanguageBreakdown data={data.languages} />
              </Paper>
            </Grid>
          </Grid>

          {/* <Grid item>
            <Contributors contributors={data.contributors} />
          </Grid> */}
          <Grid item>
            <List></List>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Repository);