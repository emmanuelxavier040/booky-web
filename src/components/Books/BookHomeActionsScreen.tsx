import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BookUpdatesList from './BookUpdatesList';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import { ICardQueueState } from '../../reducers/card.reducer';
import Badge from '@material-ui/core/Badge';
import AdminOperations from './AdminOperationScreen';
import { IUserState } from '../../reducers/card.reducer';

interface EditTabProps {
  queue: Array<ICardQueueState>
  getQueue: () => any
  approveCard: (id: number) => any
  rejectCard: (id: number) => any
  getAdminUsersOfGroup: () => any
  getMatchingUsers: (match: string) => any
  adminList: Array<IUserState>
  usersList: Array<IUserState>,
  addAdminForGroup: (id: number, user: IUserState) => any
  removeAdminFromGroup: (id: number, user: IUserState) => any
  groupId: number
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ height: '80vh' }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: 'auto',
  },
}));

export default function EditTabs(props: EditTabProps) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setCheck(!check)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getQueue = () => {props.getQueue()};
  React.useEffect(() => { 
      getQueue() 
      props.getAdminUsersOfGroup()
  
    // eslint-disable-next-line 
  }, [ check ]);

  const adminOperationsProps = {
    groupId: props.groupId,
    usersList: props.usersList,
    adminList: props.adminList,
    getAdmins: props.getAdminUsersOfGroup,
    getMatchingUsers: props.getMatchingUsers,
    addAdminForGroup: props.addAdminForGroup,
    removeAdminFromGroup: props.removeAdminFromGroup
  }

  return (
    <React.Fragment>
       <Badge color="secondary" badgeContent={props.queue.length}>
        <Button variant="outlined" size='large' color="secondary" onClick={handleClickOpen}
          startIcon={<SupervisorAccountOutlinedIcon />}>
          Admin Actions
        </Button>
      </Badge>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" keepMounted={open} fullWidth={true} maxWidth={'lg'}>
        <div className={classes.root}>
          <AppBar position="sticky" >
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="User Requests" {...a11yProps(0)} />
              <Tab label="Admins" {...a11yProps(1)} />
            </Tabs>

          </AppBar>
          <TabPanel value={value} index={0}>
            <BookUpdatesList cardQueueList={props.queue} approveCard={props.approveCard} rejectCard={props.rejectCard}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <AdminOperations {...adminOperationsProps} />
          </TabPanel>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
