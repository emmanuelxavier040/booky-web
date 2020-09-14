import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


export default function GroupCreationTemplate(props: any) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('')
  };

  const handleCreate = () => {
    if(title.length === 0) {

    }else {
      const group = {
        context: title
      }
      props.createGroup(group)
      handleClose()
    }
    
  }
  return (
    <div>
      <Button variant="outlined" size='large' color="primary" onClick={handleClickOpen}>
        Create Group
      </Button>    { props.showLoading && <Box display='flex' justifyContent='center' padding={2}>
          <CircularProgress />
        </Box>
        }
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" keepMounted={open} fullWidth={true}>
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please enter a title for the Group
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoComplete={'off'}
          />
        </DialogContent>
        <br />
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
