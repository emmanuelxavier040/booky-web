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
import { BookProps } from './Book';

interface BookViewProps {
  card: BookProps
  editable: boolean
  open: boolean
  setOpen: (value: boolean) => any
}

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



const BookView = (props: BookViewProps) => { 

  const [description, setDescription] = React.useState(props.card.card.description+'');
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
    setDescription(props.card.card.description)
  };


  const handleAction = () => {
    if(props.editable && props.card.card.description !== description)  {      
      let card2 = {...props.card.card}
      card2.description = description
      props.card.updateCard(card2)
    }
    handleClose()
  }

  let disabled: boolean = !props.editable
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" keepMounted={props.open || false} fullWidth={true}>
          <div><br /></div>

        <DialogTitle id="form-dialog-title">{props.card.card.title}</DialogTitle>
        <DialogContent>
            <Avatar aria-label="recipe" className={classes.avatar}>
            </Avatar>
            <div><br /></div>
          <TextField
            disabled={true}
            autoFocus
            margin="dense"
            id="name"
            label="URL"
            type="url"
            fullWidth
            multiline
            value={props.card.card.url+''}
          /> <div><br /></div>

          <TextField
            disabled={true}
            autoFocus
            margin="dense"
            id="name"
            label="Short URL"
            type="url"
            fullWidth
            value={props.card.card.shortUrl+''}
          /> <div><br /></div>

          <TextField
            disabled={disabled}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            autoComplete={'off'}
          /> <div><br /></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='large' color="default">
            OK
          </Button>
          <Button onClick={handleAction} size='large' color="primary">
            {props.editable ? 'Update' : 'Redirect'}
          </Button>
        </DialogActions>
        <div><br /></div>
      </Dialog>

    </React.Fragment>
  )
}

export default BookView

