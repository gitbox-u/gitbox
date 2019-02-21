import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import Repository from './RepoSnippet';
import {connect} from "react-redux";
import {updateSearchField} from '../../reducers/reposReducer';
import Pages from "./Pagination";
import * as PropTypes from "prop-types";

function Repositories(props) {
  let {shownRepos, updateSearch} = props;
  return (
    <div>
      <TextField
        placeholder="Search for a repo..."
        id="outlined-bare"
        margin="normal"
        variant="outlined"
        onChange={(e) => {
          updateSearch(e.target.value);
        }}
      />
      <Pages/>
      <Grid container
            direction="row"
            spacing={32}
            justify="center"
            alignItems="center"
      >
        {
          shownRepos.map(
            repo => (
              <Grid item>
                <Repository name={repo.name} desc={repo.desc}/>
              </Grid>
            )
          )
        }
      </Grid>
    </div>
  );
}

Repositories.propTypes = {
  shownRepos: PropTypes.any,
  updateSearch: PropTypes.any
}

const mapStateToProps = state => {
  const {allRepos, search} = state.repos;
  let shownRepos = filteredRepos(allRepos, search);
  return {shownRepos};
};

const mapDispatchToProps = dispatch => ({
  updateSearch: val => dispatch(updateSearchField(val))
});

const filteredRepos = (repos, filter) => {
  // https://stackoverflow.com/questions/11734417/javascript-equivalent-of-pythons-values-dictionary-method
  const repoValues = Object.keys(repos).map((key) => {
    return repos[key];
  });
  return repoValues.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()));
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repositories);