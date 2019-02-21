import React, {Component} from 'react';
import Paper from "./Contributors";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";

const styles = {

  contributor: {
    height: '10vh',
    marginBottom: '2vh'
  },

  name: {
    marginBottom: '2vh'
  },


};

class ContributorCard extends Component {

  constructor(props) {
    super(props);
    this.state = {raised: false}
  }


  toggleRaised = () => this.setState({raised: !this.state.raised});


  render() {

    const {classes} = this.props;


    const me = this.props.data;

    return (
      <Card className={classes.contributor}
            onMouseOver={this.toggleRaised}
            onMouseOut={this.toggleRaised}
            raised={this.state.raised}
      >

        <CardContent>
          <Typography variant="h5" className={classes.name}>
            {me.name}
          </Typography>

          <Typography variant="body1">
            {me.commits} | +{me.additions} -{me.deletions}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ContributorCard);