import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/es';
import {Button} from '@material-ui/core';

const styles = {
  noCorner: {
    borderRadius: 0,
    margin: 10
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  grey: {
    color: '#888888'
  }
};



class Pagination extends Component {

  
  handleClick = (changeTo) => (e) => {
    this.props.onClick(e, changeTo);
  };

  render() {
    const { max, current } = this.props;
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <Button className={classes.noCorner} onClick={(e) => {
          if (current > 1) this.handleClick(current - 1)(e);
        }}>
          {"<"}
        </Button>
        <div className={classes.noCorner}>
          {current} <span className={classes.grey}> of </span> {max}
        </div>
        <Button className={classes.noCorner} onClick={(e) => {
          if (current < max) this.handleClick(current + 1)(e);
        }}>
          {">"}
        </Button><br/>
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);