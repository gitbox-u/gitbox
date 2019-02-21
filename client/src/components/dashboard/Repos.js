import React, { Component } from 'react';
import { Grid, TextField } from "@material-ui/core";
import Repository from './RepoSnippet';
import { connect } from "react-redux";
import { updateSearchField, changePage } from '../../reducers/reposReducer';
import * as PropTypes from "prop-types";
import Pagination from '../core/Pagination';
import { Typography, withStyles } from '@material-ui/core/es';


const styles = {
  textInput: {
    width: '60vh',
  }
}

class Repositories extends Component {

  componentDidMount = () => {
    this.props.updateSearchField("");
  }

  handleChange = (e) => {
    this.props.updateSearchField(e.target.value);
  }

  handleClick = (e, offset) => {
    this.props.changePage(offset);
  }

  render() {

    const { allRepos, numResults, pageRepos, search, numPages, pageOffset } = this.props;

    const {classes} = this.props;

    return (
      <Grid container
        direction="column"
        alignItems="center"
        spacing={16}>

        <Grid item>
          <Typography variant="h4">
            Repositories
        </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h8">
            {`${numResults == 0 ? "No" : numResults} results`}
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


        <Grid item>
          <Grid container
            direction="row"
            spacing={32}
            justify="center"
            alignItems="center"
<<<<<<< HEAD
          >
            {
              pageRepos.map(
                repo => (
                  <Grid item>
                    <Repository name={allRepos[repo].name} desc={allRepos[repo].desc} />
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
=======
      >
        {
          shownRepos.map(
            repo => (
              <Grid item>
                <Repository name={repo.name} desc={repo.desc} key={repo.name}/>
              </Grid>
            )
          )
        }
>>>>>>> f4a83dddeb1be38f24852dad1b6776f6b791d7a5
      </Grid>
    );

<<<<<<< HEAD
  }
}
=======
Repositories.propTypes = {
  shownRepos: PropTypes.any,
  updateSearch: PropTypes.any
};
>>>>>>> f4a83dddeb1be38f24852dad1b6776f6b791d7a5

const mapStateToProps = state => {

  const { repos } = state;
  const { allRepos, filteredRepos, pageRepos, search, numPages, pageOffset } = repos;

  const numResults = filteredRepos.length;

  return { allRepos, numResults, pageRepos, search, numPages, pageOffset };
};

const mapDispatchToProps = {
  updateSearchField,
  changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Repositories));