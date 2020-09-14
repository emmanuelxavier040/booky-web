import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import valid from 'valid-url';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  }

}));

export default function BookCreationTemplate(props: any) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState('');
  const [urlErrorMessage, setUrlErrorMessage] = React.useState('');
  
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('')
    setUrl('')
    setDescription('')
    setUrlErrorMessage('')
    setTitleErrorMessage('')
    setDescriptionErrorMessage('')    
  };

  const handleCreate = () => {
    let ready = true;
    if (title.length === 0) { setTitleErrorMessage('Required'); ready = false } 
    if(description.length === 0) { setDescriptionErrorMessage('Required'); ready = false} 
    if(url.length === 0){ setUrlErrorMessage('Required'); ready = false } 
    if(!valid.isHttpUri(url) && !valid.isHttpsUri(url)) { setUrlErrorMessage('Invalid url'); ready = false} 
    if(ready) {
      const card = { title, url, description, groupId: props.groupId }
      props.createCard(card)
      handleClose()
    }

  }
  return (
    <div>
      <Button variant="outlined" size='large' color="primary" onClick={handleClickOpen} startIcon={<AddOutlinedIcon />}>
        Create Book
      </Button>    {props.showLoading && <Box display='flex' justifyContent='center' padding={2}>
        <CircularProgress />
      </Box>
      }

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" keepMounted={open} fullWidth={true}>
        <DialogTitle id="form-dialog-title">Create Book</DialogTitle>
        <DialogContent>
          <Button component="label">
            <Avatar aria-label="recipe" className={classes.avatar}>
              <AddPhotoAlternateOutlinedIcon />
            </Avatar>
            <input type="file" style={{ display: "none" }}/>
          </Button>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            inputProps={{ maxLength: 35 }}   
            value={title}
            error={titleErrorMessage.length > 0}
            helperText={titleErrorMessage}
            onChange={(event) => {setTitleErrorMessage(''); setTitle(event.target.value)}}
            autoComplete={'off'}
          />
          <div><br /></div>
          <TextField
            margin="dense"
            id="url"
            label="URL"
            type="url"
            fullWidth
            value={url}
            error={urlErrorMessage.length > 0}
            helperText={urlErrorMessage}
            onChange={(event) => {setUrlErrorMessage(''); setUrl(event.target.value)}}
            autoComplete={'off'}
          /><div><br /></div>

          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            rows={4}
            multiline
            value={description}
            inputProps={{ maxLength: 300 }}   
            error={descriptionErrorMessage.length > 0}
            helperText={descriptionErrorMessage}
            onChange={(event) => {setDescriptionErrorMessage(''); setDescription(event.target.value)}}
            autoComplete={'off'}
          /> <div><br /></div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='large' color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} size='large' color="primary">
            Create
          </Button>
        </DialogActions>
        <div><br /></div>
      </Dialog>
    </div>
  );
}
