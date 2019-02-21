import React, {Component} from 'react';
import {withStyles, Grid, Typography} from '@material-ui/core';
import CodeStream from "./CodeStream";
import Paper from "@material-ui/core/Paper";
import Contributors from "./Contributors";
import LanguageBreakdown from "./LanguageBreakdown";

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
        {"":0}
      ],
      languages: {}
    }
  };

  // Replace with server call
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
      ],
      languages: {
        "name": "nivo",
        "color": "hsl(346, 70%, 50%)",
        "children": [
          {
            "name": "C++",
            "color": "hsl(291, 70%, 50%)",
            "children": [
              {
                "name": "address.cpp",
                "color": "hsl(21, 70%, 50%)",
                "loc": 72594
              },
              {
                "name": "city.cpp",
                "color": "hsl(191, 70%, 50%)",
                "loc": 137732
              },
              {
                "name": "anima.cpp",
                "color": "hsl(217, 70%, 50%)",
                "loc": 81132
              },
              {
                "name": "movie.cpp",
                "color": "hsl(176, 70%, 50%)",
                "loc": 146492
              },
              {
                "name": "user.cpp",
                "color": "hsl(155, 70%, 50%)",
                "loc": 49485
              }
            ]
          },
          {
            "name": "javascript",
            "color": "hsl(146, 70%, 50%)",
            "children": [
              {
                "name": "clone.js",
                "color": "hsl(247, 70%, 50%)",
                "loc": 48385
              },
              {
                "name": "shuffle.js",
                "color": "hsl(125, 70%, 50%)",
                "loc": 116587
              },
              {
                "name": "pick.js",
                "color": "hsl(259, 70%, 50%)",
                "loc": 102176
              },
              {
                "name": "plouc.js",
                "color": "hsl(104, 70%, 50%)",
                "loc": 136373
              }
            ]
          },
          {
            "name": "java",
            "color": "hsl(180, 70%, 50%)",
            "children": [
              {
                "name": "main.java",
                "color": "hsl(201, 70%, 50%)",
                "loc": 35993
              },
              {
                "name": "hello.java",
                "color": "hsl(292, 70%, 50%)",
                "loc": 146986
              },
              {
                "name": "a.java",
                "color": "hsl(186, 70%, 50%)",
                "loc": 58568
              },
              {
                "name": "sa.java",
                "color": "hsl(172, 70%, 50%)",
                "loc": 83987
              },
              {
                "name": "repeat.java",
                "color": "hsl(19, 70%, 50%)",
                "loc": 138659
              },
              {
                "name": "padLeft.java",
                "color": "hsl(76, 70%, 50%)",
                "loc": 22276
              },
              {
                "name": "padRight.java",
                "color": "hsl(293, 70%, 50%)",
                "loc": 178134
              },
              {
                "name": "sanitize.java",
                "color": "hsl(266, 70%, 50%)",
                "loc": 99550
              },
              {
                "name": "ploucify.java",
                "color": "hsl(73, 70%, 50%)",
                "loc": 392
              }
            ]
          },
          {
            "name": "other",
            "color": "hsl(322, 70%, 50%)",
            "children": [
              {
                "name": "json",
                "color": "hsl(268, 70%, 50%)",
                "loc": 113195
              }
            ]
          }
        ]
      }
    }
  };


  componentDidMount() {
    this.setState({data: this.getData()});
  }

  render() {
    const data = this.state.data;

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

          <Grid item
          >
            <Grid item>
              <Paper className={classes.langBreak}>
                <LanguageBreakdown data={data.languages}/>
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