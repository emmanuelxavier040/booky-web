import * as React from 'react';
import { Container } from '@material-ui/core';

import Group from './Group';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IGroupListState } from '../../reducers/group.reducer';
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

function GroupsList(group: IGroupListState) {
  const classes = useStyles();

  return (
    <div>     
      <Container>
        {group.isloadingGroups && <Box display='flex' justifyContent='center' padding={2}>
          <CircularProgress />
        </Box>      
        }
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {group.groupList.map(
                (group) => {
                  const groupProps = {
                    id: group.id,
                    context: group.context,
                    url: group.url
                  }
                  return (
                    <Grid key={group.id} item>
                      <Group {...groupProps} />
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

export default GroupsList