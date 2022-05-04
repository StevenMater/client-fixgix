import './nav-bar.css';

import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';

//Components
import LogoutButton from '../LogoutButton';
import Loading from '../Loading/Loading';

//Cache
import {
  groupIdVar,
  isEditorVar,
  newGigVar,
  userIdVar,
} from '../../constants/cache';

//Queries
import { QUERY_GROUPS_BY_USER_PK } from '../../constants/queries';
import { mainTextColor } from '../../constants/colors';

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const groupId = useReactiveVar(groupIdVar);
  const isEditor = useReactiveVar(isEditorVar);
  const userId = useReactiveVar(userIdVar);

  const [getGroupsById, { loading, error, data }] = useLazyQuery(
    QUERY_GROUPS_BY_USER_PK
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getGroupsById({
        variables: { userId },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (data) {
      data.users_by_pk.groupsUsers.length > 0 &&
        groupIdVar(data.users_by_pk.groupsUsers[0].group.id);
    }
  }, [data]);

  //Logs
  // console.log('data :>> ', data);
  // console.log('isLoading', loading);

  if (!isAuthenticated) return null;

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    console.error(error.message);
    return <div>Error!</div>;
  }

  const {
    email,
    firstName,
    lastName,
    isManager,
    picture,
    userName,
    groupsUsers,
  } = data.users_by_pk;

  const fullName = `${firstName} ${lastName}`;

  //Logs
  // console.log('data', data);
  // console.log('user :>> ', user);
  // console.log('isEditor :>> ', isEditor);
  // console.log('isAuthenticated :>> ', isAuthenticated);
  // console.log('userId', userId);

  return (
    <div className="nav-bar-container">
      {groupId && (
        <FormControl>
          <InputLabel>Group</InputLabel>
          <Select
            value={groupId}
            label="Group"
            onChange={(event) => groupIdVar(event.target.value)}
            sx={{
              color: mainTextColor,
              borderColor: mainTextColor,
            }}
          >
            {groupsUsers.map((group: any) => {
              const { id, name } = group.group;

              return (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      {groupId && isEditor && (
        <Button variant="contained" onClick={() => newGigVar(!newGigVar())}>
          New gig
        </Button>
      )}

      {groupId && (
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                // defaultChecked
                color="warning"
                checked={isEditorVar() === true}
                onChange={() => isEditorVar(!isEditor)}
              />
            }
            label="Manager"
          />
        </FormGroup>
      )}

      <h2>FixGix</h2>

      <h5>{email}</h5>

      <LogoutButton />

      <Avatar
        alt={fullName || userName}
        src={picture}
        sx={{ width: 120, height: 120 }}
      />
    </div>
  );
}
