import React, { Component } from 'react';
import { Grid, TextField } from "@material-ui/core";
import Repository from './RepoSnippet';
import { connect } from "react-redux";
import { updateSearchField, changePage, initRepos } from '../../reducers/repositories';
import Pagination from '../core/Pagination';
import { Typography, withStyles } from '@material-ui/core/es';


const styles = {
  textInput: {
    width: '100%',
  },

  container: {
    width: '100%',
    // padding: '10px'
  },

  subcontainer: {
    width: '70%',
    // display: 'block'
    // padding: '10px'
    // marginLeft: '20vw',
  },

  repo: {
    // flex: '1 0 21%',
    width: '100%',
  },
};

class Repositories extends Component {

  componentDidMount() {
    this.props.initRepos().then(
      (_) => this.props.updateSearchField(""),
    );
  }

  handleChange = (e) => {
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
          alignItems="left"
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

          <Grid item>
            <TextField
              placeholder="Search for a repo..."
              id="outlined-bare"
              margin="normal"
              variant="outlined"
              value={search}
              onChange={this.handleChange}
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
)(withStyles(styles)(Repositories));