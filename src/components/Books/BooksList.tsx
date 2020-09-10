import * as React from 'react';
import { Container } from '@material-ui/core';
import Book from './Book';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ICardListState } from '../../reducers/card.reducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


interface BookListProps {

  card: ICardListState,
  updateCard: (value: any) => any
  groupId: number,
  isAdmin: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function BooksList(props: BookListProps) {
  const classes = useStyles();
  return (
    <div>     
      <Container>      
        <Backdrop className={classes.backdrop} open={props.card.isloadingCards}>
            <CircularProgress color="inherit" />
        </Backdrop>          
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container  spacing={3}>
              {props.card.cardList.map(
                (card) => {
                  const cardProps = {
                    id: card.id,
                    title: card.title,
                    url: card.url,
                    shortUrl: card.shortUrl,
                    description: card.description,
                    image: card.image
                  }
                  return (
                    <Grid key={card.id} item>
                      <Book card={cardProps} updateCard={props.updateCard} groupId={props.groupId} isAdmin={props.isAdmin}/>
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BooksList