import * as React from 'react';
import { Container } from '@material-ui/core';
import Book from './Book';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ICardListState } from '../../reducers/card.reducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


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
}));

function BooksList(card: ICardListState) {
  const classes = useStyles();
  return (
    <div>     
      <Container>
        {card.isloadingCards && <Box display='flex' justifyContent='center' padding={2}>
          <CircularProgress />
        </Box>      
        }
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container  spacing={3}>
              {card.cardList.map(
                (card) => {
                  const groupProps = {
                    id: card.id,
                    title: card.title,
                    url: card.url,
                    shortUrl: card.shortUrl
                  }
                  return (
                    <Grid key={card.id} item>
                      <Book {...groupProps} />
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