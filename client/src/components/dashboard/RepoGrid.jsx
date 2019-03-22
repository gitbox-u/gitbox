import React, {Component} from 'react';
import {Grid, TextField, Fab, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Repository from './RepoCard';
import {connect} from 'react-redux';
import {updateSearchField, changePage, initRepos} from '../../reducers/repositories';
import Pagination from '../core/Pagination';
import {Typography, withStyles} from '@material-ui/core/es';

const styles = {
  textInput: {
    width: '85%',
    marginRight: '10px',
  },

  container: {},

  subcontainer: {
    width: '65%',
  },

  repo: {
    width: '100%',
  },

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

    const {allRepos, numResults, pageRepos, search, numPages, pageOffset, langs} = this.props;

    const {classes} = this.props;

    return (
      <Grid container
            direction='column'
            alignItems='center'
            className={classes.container}
            spacing={16}>

        <Grid container
              direction='column'
              alignItems='flex-start'
              className={classes.subcontainer}
        >
          <Grid item>
            <Typography variant='h4'>
              Repositories
            </Typography>
          </Grid>

          <Grid item>
            <Typography>
              {`${numResults === 0 ? 'No' : numResults} results`}
            </Typography>
          </Grid>

          <Grid item
                className={classes.textInput}
          >
            <TextField
              placeholder='Search for a repo...'
              id='outlined-bare'
              margin='normal'
              variant='outlined'
              value={search}
              onChange={this.handleSearchFieldChange}
              className={classes.textInput}
            />

              <Button onClick={() => {this.props.history.push('new')}}>
                <Fab size='small' color='primary' aria-label='Add' className={classes.fab}>
                  <AddIcon/>
                </Fab>
              </Button>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container
                direction='row'
                spacing={16}
                justify='space-evenly'
                className={classes.repo}
                alignItems='center'
          >
            {
              pageRepos.map(
                (repo, i) => (
                  <Grid item
                        key={i}
                  >
                    <Repository id={repo}
                                key={2 * i}
                                name={allRepos[repo].name}
                                desc={allRepos[repo].desc}
                                breakdown={allRepos[repo].breakdown}
                                className={classes.repo}
                                allLangs ={langs}
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
  const {allRepos, filteredRepos, pageRepos, search, numPages, pageOffset, langs} = state.repos;

  const numResults = filteredRepos.length;
  return {allRepos, numResults, pageRepos, search, numPages, pageOffset, langs};
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