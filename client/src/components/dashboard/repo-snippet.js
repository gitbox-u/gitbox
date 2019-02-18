import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Badge, Card, Typography, CardHeader } from '@material-ui/core';
import { Avatar } from '@material-ui/core/es';


const styles = {
    repoCard: {
        width: 250,
        height: 180,
        padding: 24,
    },
}

class Repository extends Component {

    render() {
        const { classes } = this.props;

        const { name } = this.props;

        return (
            <Card className={classes.repoCard}>
                <CardHeader 
                    title={
                        `Repository ${name}`
                    }
                    subheader="Lorum ipsum blah blab some words here."
                />
            </Card>
        );
    }
}

export default withStyles(styles)(Repository);

