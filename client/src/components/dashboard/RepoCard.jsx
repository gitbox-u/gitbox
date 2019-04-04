import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { ButtonBase, Card, CardHeader, Grid, Badge } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { deleteRepo } from '../../api/api';
import Language from './Language';
import Close from '@material-ui/icons/Close'

const styles = {
  repoCard: {
    width: '100%',
    height: '250px',
    transition: 'box-shadow 100ms',
    textAlign: 'left',
    padding: '20px',
  },

  header: {
    color: 'white',
  },

  full: {
    width: '100%',
  },

  grow: {
    flexGrow: 1,
  },
};

class RepoCard extends Component {
  constructor(props) {
    super(props);

    this.toggleRaised = this.toggleRaised.bind(this);
  }

  state = {
    raised: false
  };

  routeChange = path => () => {
    this.props.history.push(path);
  };

  toggleRaised = () => {
    this.setState({ raised: !this.state.raised });
  };

  deleteRepo = id => {
    if (window.confirm(`Delete repository ${id}?`)) {
      deleteRepo(id).then(
        () => window.location.reload()
      )
    }
  }

  render() {
    const { classes, name, desc, id, breakdown } = this.props;

    return (
      <Badge
        className={ classes.full }
        badgeContent={
          <ButtonBase
            className={ classes.full }
            onClick={ () => this.deleteRepo(id) }>
            <Close style={ { position: 'absolute', left: '-25px', top: '5px'} }/>
          </ButtonBase>
        }>

        <ButtonBase onClick={ this.routeChange(`/repository/${id}`) }
                    className={ classes.full }
        >
          <Card
            className={ classes.repoCard }
            onMouseOver={ this.toggleRaised }
            onMouseOut={ this.toggleRaised }
            raised={ this.state.raised }
          >
            <Grid item
                  container
                  flexDirection='row'
                  justifyContent='space-between'
                  alignItems='center'
                  className={ classes.full }
            >
              <Grid item
                    className={ classes.full }
                    width="1/2"
              >
                <CardHeader
                  className={ classes.header }
                  title={ name.substring(0, 20) }
                  subheader={ desc }
                />
              </Grid>
              <div className={ classes.grow }/>

            </Grid>

            <Grid item
                  container
                  spacing={ 16 }
                  justify='stretch'
                  className={ classes.full }
                  alignItems='center'
            >
              {
                breakdown.map(
                  (lang, i) => {
                    const { language, color } = lang;

                    return (
                      <Grid item key={ i }>
                        <Language key={ 2 * i } colour={ color } language={ language }/>
                      </Grid>
                    )
                  }
                )
              }
            </Grid>
          </Card>
        </ButtonBase>
      </Badge>
    );
  }
}

export default withRouter(withStyles(styles)(RepoCard));

