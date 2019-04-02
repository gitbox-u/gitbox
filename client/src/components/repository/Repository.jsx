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

  componentDidMount() {
    this.props.initDataForRepo(this.props.match.params.id);
  }

  render() {

    const id = this.props.match.params.id;

    const {classes} = this.props;
    const {repoData, allRepos} = this.props;

    const data = repoData[id];

    if (data === undefined) return (
      <div
        className={classes.repoViewContainer}>
        {`No data for repository #${id}`}
      </div>
    );

    const {graph} = data;

    const contributorNames = data.contributors.map((c) => c.name); 
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
              <div className={classes.codeStream} title={'Code Stream'}>
                <CodeStream stats={data.stats} contributors={contributorNames}/>
              </div>
            </Paper>

            <Paper>
              <Typography variant="h6" className={classes.cardHeader}>
                Folder Tree
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
                  <div className={classes.langBreak}>
                    <LanguageBreakdown data={data.languages}/>
                  </div>
                </Paper>
              </Grid>


              <Grid item>
                <Paper>
                  <Typography variant="h6" className={classes.cardHeader}>
                    Top Coders in last 5 months
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
                <div className={classes.deleteAdd}>
                  <AddDelete data={data.addDelete}/>
                </div>
              </Paper>
            </Grid>
          </Grid>

          <Grid item className={classes.contributors}>
            <ContributorList contributors={data.contributors}/>
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