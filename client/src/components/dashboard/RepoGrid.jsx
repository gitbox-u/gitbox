import React, { Component } from 'react';
import { Grid, TextField } from "@material-ui/core";
import Repository from './RepoCard';
import { connect } from "react-redux";
import { updateSearchField, changePage, initRepos } from '../../reducers/repositories';
import Pagination from '../core/Pagination';
import { Typography, withStyles } from '@material-ui/core/es';


const styles = {
  textInput: {
    width: '100%',
  },

  container: {
  },

  subcontainer: {
    width: '65%',
  },

  repo: {
    width: '100%',
  },
};

class RepoGrid extends Component {

  componentDidMount() {
    this.props.initRepos().then(
      (_) => {
        this.props.updateSearchField("");
      }
    );
  }

  handleSearchFieldChange = (e) => {
    this.props.updateSearchField(e.target.value);
  };

  handleClick = (e, offset) => {
    this.props.changePage(offset);
  };

  render() {

    const { allRepos, numResults, pageRepos, search, numPages, pageOffset } = this.props;

    const { classes } = this.props;

    return (
      <Grid container
        direction="column"
        alignItems="center"
        className={classes.container}
        spacing={16}>

        <Grid container
          direction="column"
          alignItems="flex-start"
          className={classes.subcontainer}
        >
          <Grid item>
            <Typography variant="h4">
              Repositories
            </Typography>
          </Grid>

          <Grid item>
            <Typography>
              {`${numResults === 0 ? "No" : numResults} results`}
            </Typography>
          </Grid>

          <Grid item
                className={classes.textInput}
          >
            <TextField
              placeholder="Search for a repo..."
              id="outlined-bare"
              margin="normal"
              variant="outlined"
              value={search}
              onChange={this.handleSearchFieldChange}
              className={classes.textInput}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Grid container
            direction="row"
            spacing={16}
            justify="space-evenly"
            alignItems="center"
          >
            {
              pageRepos.map(
                repo => (
                  <Grid item
                    key={repo}
                    // lg="3"
                    // md="3"
                    // sm="6"
                    // xs="12"
                    className={classes.repo}
                  >
                    <Repository id={repo}
                      name={allRepos[repo].name}
                      desc={allRepos[repo].desc}
                      className={classes.repo}
                    />
                  </Grid>
                )
              )
            }
          </Grid>
        </Grid>

        <Grid item>
          <Pagination
            max={numPages}
            current={pageOffset}
            onClick={this.handleClick}
          />
        </Grid>
      </Grid>
    );

  }
}

const mapStateToProps = state => {
  const { repos } = state;
  const { allRepos, filteredRepos, pageRepos, search, numPages, pageOffset } = repos;

  const numResults = filteredRepos.length;

  return { allRepos, numResults, pageRepos, search, numPages, pageOffset };
};

const mapDispatchToProps = {
  updateSearchField,
  changePage,
  initRepos,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RepoGrid));