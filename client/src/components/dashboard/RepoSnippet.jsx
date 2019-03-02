import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {ButtonBase, Card, CardHeader} from '@material-ui/core';
import {withRouter} from "react-router-dom";


const styles = {
  repoCard: {
    // width: '100%',
    // width: '50%',
    width: '100%',
    height: '200px',
    transition: 'box-shadow 100ms',
    textAlign: 'left',
  },

  header: {
    // backgroundColor: 'lightblue',
    color: 'white',
    // height: '1em',
  },

  full: {
    width: '100%',
  },
};



class RepoCard extends Component {

  state = {
    raised: false
  };

  routeChange = (path) => () => {
    this.props.history.push(path);
  };

  toggleRaised = () => this.setState({raised: !this.state.raised});


  render() {
    const {classes} = this.props;

    const {name, desc, id} = this.props;


    return (
      <ButtonBase onClick={this.routeChange(`/repository/${id}`)}
                  className={classes.full}
      >
        <Card className={classes.repoCard}
              onMouseOver={this.toggleRaised}
              onMouseOut={this.toggleRaised}
              raised={this.state.raised}
        >
          <CardHeader
            className={classes.header}
            title={
              `${name}`
            }
            subheader={`${desc}`}
          />
        </Card>
      </ButtonBase>
    );
  }
}

export default withRouter(withStyles(styles)(RepoCard));

