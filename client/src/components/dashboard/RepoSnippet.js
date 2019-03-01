import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {ButtonBase, Card, CardHeader} from '@material-ui/core';
import {withRouter} from "react-router-dom";


const styles = {
  repoCard: {
    width: 250,
    height: 220,
    padding: 24,
    transition: 'box-shadow 100ms'
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

    const {name, desc} = this.props;


    return (
      <ButtonBase onClick={this.routeChange(`/repository/${name}`)}>
        <Card className={classes.repoCard}
              onMouseOver={this.toggleRaised}
              onMouseOut={this.toggleRaised}
              raised={this.state.raised}
        >
          <CardHeader
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

