import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {ButtonBase, Card, CardHeader, Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {getRandomColor} from '../../api/colours';
import Language from './Language';

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
    this.setState({raised: !this.state.raised});
  };

  render() {
    const {classes, name, desc, id, breakdown, allLangs} = this.props;

    return (
      <ButtonBase onClick={this.routeChange(`/repository/${id}`)}
                  className={classes.full}
      >
        <Card
          className={classes.repoCard}
              onMouseOver={this.toggleRaised}
              onMouseOut={this.toggleRaised}
              raised={this.state.raised}
        >
          <CardHeader
            className={classes.header}
            title={name}
            subheader={desc}
          />
          <Grid container
                spacing={16}
                justify='stretch'
                className={classes.full}
                alignItems='center'
          >
            {
              breakdown.map(
                (lang, i) => {
                  const {language, color} = lang;

                  return (
                    <Grid item key={i}>
                      <Language key={2 * i} colour={color} language={language}/>
                    </Grid>
                  )
                }
              )
            }
          </Grid>
        </Card>
      </ButtonBase>
    );
  }
}

export default withRouter(withStyles(styles)(RepoCard));

