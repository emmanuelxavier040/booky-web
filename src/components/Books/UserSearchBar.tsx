import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import { IUserState } from '../../reducers/card.reducer';

interface SearchUsersProps {
  usersList: Array<IUserState>
  adminList: Array<IUserState>
  getMatchingUsers: (match: string) => any
  addAdmin: (user: IUserState) => any
}

const initialUser: IUserState = {
  userId: -1,
  firstName: '',
  lastName: '',
  email: ''
}

export default function SearchUsers(props: SearchUsersProps) {
  const [inputValue, setInputValue] = React.useState('')
  const [activeAddAdmin, setActive] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState(initialUser);

  React.useEffect(() => {

    if (inputValue.length === 3 && inputValue.length % 3 === 0) {
      props.getMatchingUsers(inputValue)
    }
    // eslint-disable-next-line 
  }, [inputValue])

  const handleAddAdmin = () => {
    props.addAdmin(selectedUser)
    setInputValue('')
    setActive(false)
    setSelectedUser(initialUser)
  }

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="row" p={1} m={1} width={'100%'}>
        <Box p={1} width={'75%'}>
          <Autocomplete                      
            freeSolo
            id="free-solo-2-demo"
            onChange={(event, newValue) => {

              if (typeof newValue !== 'string') {
                setSelectedUser(newValue)
                setActive(true)
              } else {
                setSelectedUser(initialUser)
                setActive(false)
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}            
            disableClearable
            options={props.usersList}
            getOptionLabel={(option: any) => {
              return (option.firstName + ' ' + option.lastName)
            }}
            renderInput={(params) => (
              <TextField                              
                {...params}
                label="Search user"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}                
              />
            )}
          />
        </Box>

        <Box p={4}>
          <Button startIcon={<PersonAddIcon />} disabled={!activeAddAdmin} onClick={handleAddAdmin}>Add</Button>
        </Box>
      </Box>
    </React.Fragment>

  );
}

// 