import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Typography } from '@material-ui/core';
import CodeStream from "./CodeStream";
import Paper from "@material-ui/core/Paper";
import LanguageBreakdown from "./LanguageBreakdown";
import FolderTree from "./FolderTree";
import GitGraph from './GitGraph';
import ContributorList from "./ContributorList"
import AddDelete from "./AddDelete";
import { initDataForRepo } from '../../reducers/repositories';

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
    marginTop: '2vh'
  },

  gitGraph: {
    width: '100%',
    height: '200px',
  },

  repoName: {},

  contributors: {
    height: '64vh',
    width: '15vw',
  },

  langBreak: {
    width: '14.5vw',
    height: '30vh'
  }

};

class Repository extends Component {

  componentDidMount() {
    this.props.initDataForRepo(this.props.match.params.id);
  }

  render() {

    const id = this.props.match.params.id;

    const { classes } = this.props;
    const { repoData, allRepos } = this.props;

    const data = repoData[id];

    if (data === undefined) return (
      <div
        className={classes.repoViewContainer}>
        {`No data for repository #${id}`}
      </div>);

    const { graph } = data;

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
            {`${data.name} | Repository #${data.id}`}
          </Typography>
          <Typography className={classes.repoName} variant="h6">
            {data.desc}
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.gitGraph}>
            <GitGraph graph={graph}>
            </GitGraph>
          </Paper>
        </Grid>

        <Grid item
          container
          direction="row"
          spacing={16}
        >

          <Grid item>
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

          <Grid item>
            <Grid item container
              direction="row"
              spacing={16}

            >

              <Grid item>
                <Paper className={classes.langBreak}>
                  <LanguageBreakdown data={data.languages} />
                </Paper>
              </Grid>


              <Grid item>
                <Paper className={classes.langBreak}>
                  <LanguageBreakdown data={data.languages} />
                </Paper>
              </Grid>
            </Grid>
            

            <Grid item>
              <Paper className={classes.deleteAdd}>
                <AddDelete data={data.languages} />
              </Paper>
            </Grid>
          </Grid>

          {/* <Grid item>
            <Contributors contributors={data.contributors} />
          </Grid> */}
          <Grid item className={classes.contributors}>
            <ContributorList contributors={data.contributors} />
          </Grid>

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