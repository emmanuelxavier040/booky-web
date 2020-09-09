import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';



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
  },
  cardHeaderRoot: {
    overflow: "hidden"
  },
  cardHeaderContent: {
    overflow: "hidden"
  }

}));



const BookView = (props: any) => { 
  // Card Id
  // Short URL
  // Short Title
  // Description
  // Image
  // Authorized
  // UserId
  // Group Id

  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleCreate = () => {
      handleClose()
  }

  let disabled = true
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" keepMounted={props.open || false} fullWidth={true}>
          <div><br /></div>

        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <Avatar aria-label="recipe" className={classes.avatar}>
            </Avatar>
            <div><br /></div>
          <TextField
            disabled={disabled}
            autoFocus
            margin="dense"
            id="name"
            label="URL"
            type="url"
            fullWidth
            value={props.url+''}
          /> <div><br /></div>

          <TextField
            disabled={disabled}
            autoFocus
            margin="dense"
            id="name"
            label="Short URL"
            type="url"
            fullWidth
            value={props.shortUrl+''}
          /> <div><br /></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='large' color="default">
            OK
          </Button>
          <Button onClick={handleCreate} size='large' color="primary">
            Redirect
          </Button>
        </DialogActions>
        <div><br /></div>
      </Dialog>

    </React.Fragment>
  )
}

export default BookView

