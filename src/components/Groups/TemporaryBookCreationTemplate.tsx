import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { IShortUrlState } from '../../reducers/group.reducer';
import valid from 'valid-url';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles, makeStyles } from '@material-ui/core/styles';


interface TempBookCreationProps {
  shortUrl: IShortUrlState,
  createShortUrl: (url: any) => any
  clearUrlState: () => any
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function TempBookCreationTemplate(props: TempBookCreationProps) {
  const classes = useStyles();
  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'blue',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'blue',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'blue',
        },
      },
    },
  })(TextField);

  const [open, setOpen] = React.useState(false);
  const [longUrl, setLongUrl] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState(new Date());

  const [longUrlErrorMessage, setLongUrlErrorMessage] = React.useState('')
  const [expiryDateErrorMessage, setExpiryDateErrorMessage] = React.useState('')

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false); setLongUrl(''); setLongUrlErrorMessage('')
    setExpiryDate(new Date()); setExpiryDateErrorMessage('')
    props.clearUrlState()
  };

  const serviceUrl = process.env.REACT_APP_SERVICE_URL || 'http://localhost:8080/api/v1'
  const shorUrl = props.shortUrl.shortUrl
  const redirectUrl = shorUrl === '' || shorUrl === undefined || shorUrl === null ? '' : serviceUrl.replace('/api/v1', '').concat('/r/').concat(props.shortUrl.shortUrl)


  const handleCreate = () => {
    props.clearUrlState()
    let ready = true

    if (longUrl.length === 0) { setLongUrlErrorMessage('Required'); ready = false }
    if (!valid.isHttpUri(longUrl) && !valid.isHttpsUri(longUrl)) { setLongUrlErrorMessage('Invalid url'); ready = false }

    if (expiryDate === null || expiryDate === undefined) { setExpiryDateErrorMessage('Required'); ready = false }
    try {
      expiryDate.toISOString()
    } catch(Exception) {
        setExpiryDateErrorMessage('Invalid format'); ready = false
    }

    if (ready) {
      var isoDateTime = new Date(expiryDate.getTime() - (expiryDate.getTimezoneOffset() * 60000)).toISOString();
      const url = { url: longUrl, expiryDate: isoDateTime }
      props.createShortUrl(url)
    }
  }

  const copyToClipBoard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = redirectUrl;
    const parentElement: any = document.getElementById('form-dialog-title');
    parentElement.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    parentElement.removeChild(textField);
  }

  const currDate : Date = new Date()
  const maxDateNumber = new Date().setDate(currDate.getDate() + 10)    
  return (
    <div>
      <Button variant="outlined" size='large' color="secondary" onClick={handleClickOpen}>
        Temporary Short URL
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" keepMounted={open} fullWidth={true}>
        <DialogTitle id="form-dialog-title">Generate Short URL</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To generate a temporary short URL please enter a URL and select an expiry time.
          </DialogContentText>
          <br />
          <TextField
            autoFocus margin="dense" id="longUrl" label="Long URL" type="text" fullWidth multiline rows={4}
            value={longUrl}
            error={longUrlErrorMessage.length > 0}
            helperText={longUrlErrorMessage}
            onChange={(event) => { setLongUrlErrorMessage(''); setLongUrl(event.target.value) }}
            autoComplete={'off'}
          />
          <br /><br /> <br />      
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              variant="inline"
              ampm={false}
              label="Expiry Date Time"
              value={expiryDate}
              onChange={(props: any) => { setExpiryDateErrorMessage(''); setExpiryDate(props) }}                         
              disablePast
              error={expiryDateErrorMessage.length > 0}
              helperText={expiryDateErrorMessage}
              maxDate={maxDateNumber}              
              format="yyyy/MM/dd HH:mm"              
            />
          </MuiPickersUtilsProvider> <em>Default exipry is 1 hour</em>
          <br /><br /><br /><br />

          <CssTextField
            className={classes.margin}
            id="outlined-basic" label="Short URL" variant="outlined"  fullWidth
            value={redirectUrl}
            InputProps={{              
              endAdornment: <Tooltip title='Copy to Clipboard'>
                <IconButton onClick={copyToClipBoard}>
                  <FileCopyOutlinedIcon />
                </IconButton>
              </Tooltip>
            }}
          />          
        </DialogContent>       
        <br /><br />
        <DialogActions>
          <Button onClick={handleClose} color="secondary" size='large'>
            CLOSE
          </Button>
          <Button onClick={handleCreate} color="primary" size='large'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
