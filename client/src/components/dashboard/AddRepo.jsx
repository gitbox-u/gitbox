import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { addRepo } from '../../api/api';
import { refresh } from "../../reducers/repositories";

function AddRepo({ refresh }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [remoteUrl, setRemoteUrl] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    handleClose();
    let auth = undefined;
    if (authUsername.length > 0 && authPassword.length > 0) {
      auth = {username: authUsername, password: authPassword};
    }
    addRepo(name, remoteUrl, auth).then(() => { 
      refresh();
    });
  };

  return (
    <div>
      <Button onClick={ handleClickOpen } style={ { marginTop: '10px' } }>
        <Fab size='medium' color='primary' aria-label='Add' style={ { boxShadow: "none" } }>
          <AddIcon/>
        </Fab>
      </Button>

      <Dialog
        open={ open }
        onClose={ open }
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a repository</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of Repository"
            type="name"
            fullWidth
            valie={ name }
            onChange={ (e) => setName(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="URL"
            label="Repository URL"
            type="URL"
            fullWidth
            onChange={ (e) => setRemoteUrl(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="User Name"
            label="User Name (Optional)"
            type="User Name"
            fullWidth
            onChange={ (e) => setAuthUsername(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password (Optional)"
            type="password"
            fullWidth
            onChange={ (e) => setAuthPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Cancel
          </Button>
          <Button onClick={ handleAdd } color="primary">
            Add Repository
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = {
  refresh: refresh,
};

export default connect(null, mapDispatchToProps)(AddRepo);