import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Badge, Card, Typography } from '@material-ui/core';


const styles = {
    repoCard: {
        width: 200,
        height: 300,
        padding: 24,
    },
}

class Repository extends Component {

    render() {
        const { classes } = this.props;

        const {name} = this.props;

        return (
            <Badge badgeContent={name} color="secondary">
            <Card className={classes.repoCard}>
                <Typography variant="h6">
                    { `Repository ${name}` }
                </Typography>
                <Typography variant="h7">
                Lorem ipsum
                </Typography>
            </Card>
                </Badge>
        );
    }
}

export default withStyles(styles)(Repository);

