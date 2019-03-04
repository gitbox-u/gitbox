import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {ButtonBase, Card, CardHeader} from '@material-ui/core';
import {withRouter} from "react-router-dom";


const styles = {
  repoCard: {
    width: '70%',
    height: '150px',
    transition: 'box-shadow 100ms',
    textAlign: 'left',
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

  routeChange = (path) => () => {
    this.props.history.push(path);
  };

  toggleRaised() {
    this.setState({raised: !this.state.raised});
  }

  render() {
    const { classes, name, desc, id } = this.props;

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
            title={name}
            subheader={desc}
          />
        </Card>
      </ButtonBase>
    );
  }
}

export default withRouter(withStyles(styles)(RepoCard));

