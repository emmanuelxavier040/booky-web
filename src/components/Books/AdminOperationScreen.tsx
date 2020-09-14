import * as React from 'react';
import { IUserState } from '../../reducers/card.reducer';


import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';



import SearchUsers from './UserSearchBar'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

interface AdminOperationsProps {
    groupId: number,
    adminList: Array<IUserState>
    usersList: Array<IUserState>
    getAdmins: () => any
    getMatchingUsers: (match: string) => any
    addAdminForGroup: (id: number, user: IUserState) => any
    removeAdminFromGroup: (id: number, user: IUserState) => any
}


const AdminOperations = (props: AdminOperationsProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>        
            <SearchUsers usersList={props.usersList} 
            adminList={props.adminList} 
            getMatchingUsers={props.getMatchingUsers} 
            addAdmin={(user: IUserState) => {props.addAdminForGroup(props.groupId, user)}}/>              
            <br />
            <Divider />
            {props.adminList.map(user => {
                return (
                    <div className={classes.root} key={user.userId}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={user.firstName + ' ' + user.lastName} secondary={user.email} />
                            </ListItem>
                            <ListItemSecondaryAction>
                                <Tooltip title="Remove">
                                    <IconButton edge="end" aria-label="remove" onClick={() => {props.removeAdminFromGroup(props.groupId, user)}}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </List>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default AdminOperations

