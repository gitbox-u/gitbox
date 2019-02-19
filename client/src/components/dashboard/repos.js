import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import Repository from './repo-snippet';
import {connect} from "react-redux";

const Repositories = (props) => {

  const {repos} = props;

  return (


    <Grid container
          direction="row"
          spacing={32}
          justify="center"
          alignItems="center"
    >
      {
        repos.map(
          id => (
            <Grid item>
              <Repository name={id}/>
            </Grid>
          )
        )
      }
    </Grid>
  )

};

const mapStateToProps = state => {
  const {repos} = state;
  return {repos}
};

export default connect (
  mapStateToProps
)(Repositories);