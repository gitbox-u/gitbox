import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid, TextField, Fab, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button> */}

        <Button onClick={this.handleClickOpen} style={{marginTop: '10px'}}>
                <Fab size='medium' color='primary' aria-label='Add' style={{boxShadow: "none"}}>
                  <AddIcon/>
                </Fab>
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a repository to your dashboard.</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of your repository, the URL to the repo and the credentials for repository of required.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of Repository"
              type="name"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="URL"
              label="Repository URL"
              type="URL"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="User Name"
              label="User Name"
              type="User Name"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add Repository
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}