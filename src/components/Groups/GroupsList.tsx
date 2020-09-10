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

interface GroupListType {
  groups: IGroupListState,
  userId: number,
  mygroups: boolean
}


function GroupsList(props : GroupListType) {
  const classes = useStyles();
  let groupList = props.groups.groupList
  if(props.mygroups) {
    groupList = props.groups.groupList.filter((group) => { return group.adminIds.includes(props.userId)})
  }
  return (
    <div>     
      <Container>
        {props.groups.isloadingGroups && <Box display='flex' justifyContent='center' padding={2}>
          <CircularProgress />
        </Box>      
        }
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {groupList.map(
                (group) => {
                  const groupProps = {
                    id: group.id,
                    context: group.context
                  }
                  return (
                    <Grid key={group.id} item>
                      <Group group={groupProps} isAdmin={group.adminIds.includes(props.userId)}/>
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