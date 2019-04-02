import React, { Component } from 'react';
import { Grid, TextField, Fab, Button } from '@material-ui/core';
import Repository from './RepoCard';
import { connect } from 'react-redux';
import { updateSearchField, changePage, refresh } from '../../reducers/repositories';
import Pagination from '../core/Pagination';
import { Typography, withStyles } from '@material-ui/core/es';
import AddRepo from './AddRepo';

const styles = {
  textInput: {
    width: '90%',
    marginRight: '10px',
  },

  container: {
    width: '100%',
  },

  // subcontainer: { width: '100%' },
  //
  // repo: { width: '100%' },

  fab: {
    margin: '10px 0',
  },
};

class RepoGrid extends Component {
  componentDidMount() {
    this.props.initRepos().then(
      () => {
        this.props.updateSearchField('');
      }
    );
  }

  handleSearchFieldChange = e => {
    this.props.updateSearchField(e.target.value);
  };

  handleClick = (e, offset) => {
    this.props.changePage(offset);
  };

  render() {

    const { allRepos, numResults, pageRepos, search, numPages, pageOffset, langs } = this.props;

    const { classes } = this.props;

    return (
      <Grid container
            direction='column'
            alignItems='center'
            className={ classes.container }
            spacing={ 16 }>

        <Grid container
              direction='column'
              alignItems='flex-start'
          // className={ classes.subcontainer }
        >
          <Grid item>
            <Typography variant='h4'>
              Repositories
            </Typography>
          </Grid>

          <Grid item>
            <Typography>
              { `${numResults === 0 ? 'No' : numResults} results` }
            </Typography>
          </Grid>

          <Grid container
                className={ classes.textInput }
                alignItems='inline'
          >
            <TextField
              placeholder='Search for a repository...'
              id='outlined-bare'
              margin='normal'
              variant='outlined'
              value={ search }
              onChange={ this.handleSearchFieldChange }
              className={ classes.textInput }
            />

            <AddRepo/>
          </Grid>
        </Grid>

        <Grid item
              className={ classes.container }>
          <Grid container
                className={ classes.container }
                direction='row'
                lg={ 12 }
                spacing={ 32 }
                alignItems='flex-start'
          >
            {
              pageRepos.map(
                (repo, i) => (
                  <Grid item
                        key={ i }
                        flexGrow={ 1 }
                        lg={ 3 } md={ 6 } sm={ 12 }
                  >
                    <Repository id={ repo }
                                key={ 2 * i }
                                name={ allRepos[repo].name }
                                desc={ allRepos[repo].desc }
                                breakdown={ allRepos[repo].breakdown }
                                allLangs={ langs }
                    />
                  </Grid>

                )
              )
            }
          </Grid>
        </Grid>

        <Grid item>
          <Pagination
            max={ numPages }
            current={ pageOffset }
            onClick={ this.handleClick }
          />
        </Grid>
      </Grid>
    );

  }
}

const mapStateToProps = state => {
  const { allRepos, filteredRepos, pageRepos, search, numPages, pageOffset, langs } = state.repos;

  const numResults = filteredRepos.length;
  return { allRepos, numResults, pageRepos, search, numPages, pageOffset, langs };
};

const mapDispatchToProps = {
  updateSearchField,
  changePage,
  initRepos: refresh,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RepoGrid));