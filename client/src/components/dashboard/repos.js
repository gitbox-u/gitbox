import React, { Component } from 'react';
import { Grid, TextField } from "@material-ui/core";
import Repository from './repo-snippet';
import { connect } from "react-redux";
import { updateSearchField } from '../../reducers/reposReducer';
import Pages from "./pagination";

class Repositories extends Component {

  handleChange = (e) => {
    const { value } = e.target;
    this.props.updateSearchField(value);
  }

  render() {

    const { allRepos, search, filteredRepos } = this.props.repos;

    return (
      <div>
        <TextField
          placeholder="Search for a repo..."
          id="outlined-bare"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={search}
        />
        <Pages />
        <Grid container
          direction="row"
          spacing={32}
          justify="center"
          alignItems="center"
        >
          {
            filteredRepos.map(
              id => (
                <Grid item>
                  <Repository name={allRepos[id].name} desc={allRepos[id].desc} />
                </Grid>
              )
            )
          }
        </Grid>
      </div>

    )
  }

};

const mapStateToProps = state => {
  const { repos } = state;
  return { repos }
};

const mapDispatchToProps = {
  updateSearchField
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repositories);