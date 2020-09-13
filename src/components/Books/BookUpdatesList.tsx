import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { ICardQueueState } from '../../reducers/card.reducer';

import BookView from './BookView';
import { BookContentProps } from './Book';


interface BookUpdateListProps {
    cardQueueList: Array<ICardQueueState>
    approveCard: (id: number) => any
    rejectCard: (id: number) => any
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));


export default function BookUpdatesList(props: BookUpdateListProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const intialState: BookContentProps = {
        id: -1,
        title: '',
        url: '',
        shortUrl: '',
        description: '',
        image: ''
    }
    const [requestCard, setRequestCard] = React.useState(intialState);
    const handleViewReqeust = (card : any) => {
        setOpen(!open)
        setRequestCard(card)
    }
    return (
        <React.Fragment>
            {open && <BookView open={open} setOpen={setOpen}
                card={{
                    card: requestCard,
                    updateCard: () => {},
                    groupId: -1, 
                    isAdmin: true,
                    deleteCard: () => {}
                }}
                editable={false}
            />}
            <div className={classes.demo}>
                {props.cardQueueList.length === 0 &&
                    <Container>
                        <Box display="flex" 
                            alignItems="center"
                            justifyContent="center">
                            <h4>No Requests Pending</h4>
                        </Box>
                        <hr className="my-2" />
                    </Container>
                    
                }
                <List>                  
                      {props.cardQueueList.map((card) => {
                          return(
                        <ListItem button key={card.id} onClick={() =>{handleViewReqeust(card)}}>
                            <ListItemAvatar>
                                <Avatar>
                                    <LabelOutlinedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={card.title}
                                secondary={card.status}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title="Accept">
                                    <IconButton edge="end" aria-label="accept" onClick={() => {props.approveCard(card.id)}}>
                                        <DoneOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove">
                                    <IconButton edge="end" aria-label="remove" onClick={() => {props.rejectCard(card.id)}}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                      )})}
                </List>
            </div>           
        </React.Fragment>
    );
}
