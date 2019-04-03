import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles, Grid, Typography, Button} from '@material-ui/core';
import CodeStream from "./CodeStream";
import Paper from "@material-ui/core/Paper";
import LanguageBreakdown from "./LanguageBreakdown";
import GitGraph from './GitGraph';
import ContributorList from "./ContributorList"
import AddDelete from "./AddDelete";
import {initDataForRepo} from '../../reducers/repositories';
import FolderTree from './FolderTree';
import MiniCalendar from "./MiniCalendar";
import Refresh from '@material-ui/icons/Sync';

const styles = {
  repoViewContainer: {
    padding: 100,
  },

  codeStream: {
    height: '30vh',
    width: '40vw',
    marginBottom: '2vh'
  },

  deleteAdd: {
    height: '30vh',
    width: '30vw',
    marginBottom: '2vh',
  },

  gitGraph: {
    width: '100%',
    height: '200px',
  },

  repoName: {},

  contributors: {
    height: '70vh',
    width: '15vw',
  },

  langBreak: {
    width: '14.5vw',
    height: '30vh'
  },

  cardHeader: {
    textAlign: 'center',
  },

  addDelCon: {
    marginTop: '2vh'
  }

};

class Repository extends Component {
  state = {
    checked: null,
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

  componentDidMount() {
    this.props.initDataForRepo(this.props.match.params.id);
  }

  render() {

    const id = this.props.match.params.id;

    const {classes} = this.props;
    const {repoData} = this.props;

    const data = repoData[id];

    if (data === undefined) return (
      <div
        className={classes.repoViewContainer}>
        {`No data for repository #${id}`}
      </div>
    );

    let {graph, contributors} = data;

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
            spacing={16}
            direction="column"
            className={classes.repoViewContainer}
      >
      <Grid container spacing={32} alignItems="center">
        <Grid item>
          <Typography className={classes.repoName} variant="h4">
            {`${data.name} | Repository #${data.id}`}
          </Typography>
          <Typography className={classes.repoName} variant="h6">
            {data.desc}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" className={classes.button}><Refresh style ={{fontSize: 30, marginRight: 10}}></Refresh> Refresh Statistics</Button>
        </Grid>
      </Grid>

        <Grid item>
          <Paper >
            <Typography variant="h6" className={classes.cardHeader}>
              Repository History
            </Typography>
            <Typography className={classes.cardHeader}>
              A view of your repositories history and branches over time. Scroll to zoom in, and drag to move.
            </Typography>
            <div className={classes.gitGraph}>
            <GitGraph graph={graph}>
            </GitGraph>
            </div>
          </Paper>
        </Grid>
        <Grid item
              container
              direction="row"
              spacing={16}
        >
          <Grid item>
            <Paper>
              <Typography variant="h6" className={classes.cardHeader}>
                Contributions over time
              </Typography>
              <Typography className={classes.cardHeader}>
                Hover over the graph to see the breakdown in contributions per day.
              </Typography>
              <div className={classes.codeStream} title={'Code Stream'}>
                <CodeStream stats={data.stats} contributors={contributors}/>
              </div>
            </Paper>

            <Paper>
              <Typography variant="h6" className={classes.cardHeader}>
                Folder Tree
              </Typography>
              <Typography className={classes.cardHeader}>
                A break down of the folder and file structure of your repository.
              </Typography>
              <div className={classes.codeStream}>
                <FolderTree data={data.tree}/>
              </div>
            </Paper>

          </Grid>

          <Grid item>
            <Grid item container
                  direction="row"
                  spacing={16}
            >
              <Grid item>
                <Paper>
                  <Typography variant="h6" className={classes.cardHeader}>
                    Language Breakdown
                  </Typography>
                  <Typography className={classes.cardHeader}>
                    Hover for individual file languages.
                  </Typography>
                  <Typography className={classes.cardHeader}>
                    
                  </Typography>
                  <div className={classes.langBreak}>
                    <LanguageBreakdown data={languages}/>
                  </div>
                </Paper>
              </Grid>


              <Grid item>
                <Paper>
                  <Typography variant="h6" className={classes.cardHeader}>
                    Top Contributors
                  </Typography>
                  <Typography className={classes.cardHeader}>
                    Top 5 contributors in the last 5 months.
                  </Typography>
                  <div className={classes.langBreak}>
                    <MiniCalendar data={data.calendar}/>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid item>
              <Paper className={classes.addDelCon}>
                <Typography variant="h6" className={classes.cardHeader}>
                  Additions and Deletions
                </Typography>
                <Typography className={classes.cardHeader}>
                    Hover over to see a breakdown per day.
                </Typography>
                <div className={classes.deleteAdd}>
                  <AddDelete data={addDelete}/>
                </div>
              </Paper>
            </Grid>
          </Grid>

          <Grid item className={classes.contributors}>
            <ContributorList contributors={data.contributors} handleToggle={this.handleToggle} checked={this.state.checked}/>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {repos} = state;
  const {allRepos, repoData} = repos;

  return {
    allRepos,
    repoData,
  }
};

const mapDispatchToProps = {
  initDataForRepo,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Repository));