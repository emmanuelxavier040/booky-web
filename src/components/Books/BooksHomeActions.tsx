import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AddIcon from '@material-ui/icons/Add';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position: 'fixed',
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 100,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(1),
      left: theme.spacing(1),
    },
  },
}));

const actions = [    
  { icon: <AddIcon onClick={() => {}} />, name: 'Create Book' },
  { icon: <FileCopyIcon />, name: 'Copy Group URL' },
  { icon: <BookmarkBorderIcon />, name: 'Bookmark Group' },
  { icon: <DeleteOutlineIcon />, name: 'Delete Group' },
  { icon: <PeopleOutlineIcon />, name: 'Add Admins' },
];

export default function GroupActions() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>           
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<EditIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={"down"}          
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement={'right'}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}
