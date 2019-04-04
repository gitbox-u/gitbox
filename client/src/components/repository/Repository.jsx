import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import CodeStream from "./CodeStream";
import Paper from "@material-ui/core/Paper";
import AddDelete from './AddDelete';
import LanguageBreakdown from "./LanguageBreakdown";
import GitGraph from './GitGraph';
import ContributorList from "./ContributorList"
import { initDataForRepo } from '../../reducers/repositories';
import FolderTree from './FolderTree';
import MiniCalendar from "./MiniCalendar";
import Refresh from '@material-ui/icons/Sync';

const styles = {
  repoViewContainer: {
    padding: '120px 5vw',
  },

  full: {
    width: '100%',
    height: '100%',
  },

  paddedFull: {
    width: '100%',
    height: '100%',
    margin: '0 8px',
  },

  stat: {
    width: '100%',
    height: '250px',
  },

  btn: {
    marginRight: 'calc(5vw + 10px)',
    marginBottom: '10px',
    position: 'absolute',
    right: '0'
  },

  codeStream: {
    height: '250px',
    width: '100%',
  },

  deleteAdd: {
    height: '250px',
    width: '100%',
  },

  gitGraph: {
    height: '250px',
    width: '100%',
  },

  repoName: {
    paddingLeft: '10px',
    paddingBottom: '10px',
  },

  contributors: {
    height: '966px',
    width: '100%',
  },

  langBreak: {
    height: '250px',
    width: '100%',
  },

  cardHeader: {
    textAlign: 'center',
  },

  cardSub: {
    fontSize: '0.8em',
    color: 'grey',
    textAlign: 'center',
  },

  addDelCon: {
    marginTop: '2vh'
  },

  grow: {
    flexGrow: 1,
  },

  paper: {
    height: '100%',
    width: '100%',
    padding: '0.1em',
    // overflowY: 'hidden',
  },
};

class Repository extends Component {
  state = {
    checked: null,
    message: "Click on a graph node to check out the specific commit!"
  };

  /**
   * For currently selected contributors
   */
  handleToggle = value => () => {
    let newValue;

    if (this.state.checked === value.name) {
      newValue = null;
    } else {
      newValue = value.name;
    }

    this.setState({
      checked: newValue,
    });
  };

  handleCommitChange = commit => {
    console.log(commit);
    const {sha, author, message} = commit;
    this.setState({
      message: (
        <div>
        <Typography>{`SHA: ${sha}`}</Typography>
          <Typography>{`Author: ${author}`}</Typography>
          <Typography>{`Message: ${message}`}</Typography>
        </div>
      ),
    })
  }

  componentDidMount() {
    this.props.initDataForRepo(this.props.match.params.id);
  }

  render() {

    const id = this.props.match.params.id;

    const { classes } = this.props;
    const { repoData } = this.props;

    const data = repoData[id];

    if (data === undefined) return (
      <div
        className={ classes.repoViewContainer }>
        { `No data for repository #${id}` }
      </div>
    );

    let { graph, contributors } = data;

    let languages, addDelete;

    if (this.state.checked in data.stats_committers) {
      // use user dependent stats TODO: fix, so this wrapping is done in the parser?
      languages = {
        children: data.stats_committers[this.state.checked].languages,
        name: "language",
      };
      addDelete = data.stats_committers[this.state.checked].addDelete;
    } else {
      languages = data.languages;
      addDelete = data.addDelete;
    }

    return (
      <Grid item
            container
            justify="center"
            spacing={ 16 }
            direction="row"
            className={ classes.repoViewContainer }
      >
        <Grid item xs={ 9 }>
          <Typography className={ classes.repoName } variant="h4">
            { `${data.name}` }
          </Typography>
          <Typography className={ classes.repoName } variant="h6">
            { data.desc }
          </Typography>
        </Grid>

        <Grid item xs={ 3 }>
          <Button variant="outlined" className={ classes.btn } onClick={(e) => {
            console.log(e);
          }}><Refresh
            style={ { fontSize: 30 } }/> Refresh Statistics</Button>
        </Grid>

        <Grid item xs={ 12 } className={ classes.paddedFull }>
          <Paper className={ classes.paper }>
            <Typography variant="h6" className={ classes.cardHeader }>
              Repository History
            </Typography>
            <Typography className={ classes.cardSub }>
              A view of your repositories history and branches over time. Scroll to zoom in, and drag to move.
            </Typography>
            <Grid container className={classes.gitGraph} spacing={16}>
              <Grid item xs={ 10 } >
                <GitGraph graph={graph} commits={data.commits} commitChange={this.handleCommitChange} >
                </GitGraph>
              </Grid>
              <Grid item xs={ 2 }>
                <div>
                  {this.state.message}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item container spacing={ 16 } xs={ 9 }>
          <Grid item xs={ 12 }>
            <Paper className={ classes.paper }>
              <Typography variant="h6" className={ classes.cardHeader }>
                Contributions Over Time
              </Typography>
              <Typography className={ classes.cardSub }>
                Hover over the graph to see the breakdown in contributions per day.
              </Typography>
              <div className={ classes.codeStream } title={ 'Code Stream' }>
                <CodeStream stats={ data.stats } contributors={ contributors }/>
              </div>
            </Paper>
          </Grid>


          <Grid item xs={ 3 }>
            <Paper className={ classes.paper }>
              <Typography variant="h6" className={ classes.cardHeader }>
                Top Contributors
              </Typography>
              <Typography className={ classes.cardSub }>
                Top 5 over the last 5 months.
              </Typography>
              <div className={ classes.langBreak }>
                <MiniCalendar data={ data.calendar }/>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={ 3 }>
            <Paper className={ classes.paper }>
              <Typography variant="h6" className={ classes.cardHeader }>
                Language Breakdown
              </Typography>
              <Typography className={ classes.cardSub }>
                Hover for individual file languages.
              </Typography>
              <div className={ classes.langBreak }>
                <LanguageBreakdown data={ languages }/>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={ 6 }>
            <Paper className={ classes.paper }>
              <Typography variant="h6" className={ classes.cardHeader }>
                Additions and Deletions
              </Typography>
              <Typography className={ classes.cardSub }>
                Hover over to see a breakdown per day.
              </Typography>
              <div className={ classes.deleteAdd }>
                <AddDelete data={ addDelete }/>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={ 12 }>
            <Paper className={ classes.paper }>
              <Typography variant="h6" className={ classes.cardHeader }>
                Folder Tree
              </Typography>
              <Typography className={ classes.cardSub }>
                A breakdown of the folder and file structure of your repository.
              </Typography>
              <div className={ classes.codeStream }>
                <FolderTree data={ data.tree }/>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Grid item className={ classes.contributors } xs={ 3 }>
          <Paper className={ classes.paper }>
            <ContributorList contributors={ data.contributors }
                             handleToggle={ this.handleToggle }
                             checked={ this.state.checked }
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { repos } = state;
  const { allRepos, repoData } = repos;

  return {
    allRepos,
    repoData,
  }
};

const mapDispatchToProps = {
  initDataForRepo,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Repository));