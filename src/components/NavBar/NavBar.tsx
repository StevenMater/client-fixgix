import './nav-bar.css';

import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import { useEffect } from 'react';

//Components
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';

//Cache
import {
  groupIdVar,
  isEditorVar,
  newGigVar,
  userIdVar,
} from '../../constants/cache';

//Queries
import { GET_GROUPS_BY_ID } from '../../constants/queries';
import { decorationColor } from '../../constants/colors';
import Loading from '../Loading/Loading';

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const groupId = useReactiveVar(groupIdVar);
  const isEditor = useReactiveVar(isEditorVar);
  const userId = useReactiveVar(userIdVar);

  const [getGroupsById, { loading, error, data }] =
    useLazyQuery(GET_GROUPS_BY_ID);

  const userControls: any = isAuthenticated ? (
    <LogoutButton />
  ) : (
    <LoginButton />
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
      groupIdVar(data.users_by_pk.groupsUsers[0].group.id);
    }
  }, [data]);

  //Logs
  // console.log('filter :>> ', filter);
  console.log('data :>> ', data);
  // console.log('user :>> ', user);
  // console.log('isEditor :>> ', isEditor);
  // console.log('user.picture', user?.picture);
  // console.log('isLoading', loading);
  // console.log('isAuthenticated :>> ', isAuthenticated);
  // console.log('filter data :>> ', data.users_by_pk.groupsUsers[0].id);

  if (!isAuthenticated) return null;

  if (!data || loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error.message);
    return <div>Error!</div>;
  }

  return (
    <div className="nav-bar-container d-flex flex-row align-items-center justify-content-around">
      <NavLink to="/" className="navlink">
        <h3>FixGix</h3>
      </NavLink>

      <FormControl>
        <InputLabel>Group</InputLabel>
        <Select
          value={groupId}
          label="Group"
          onChange={(event) => groupIdVar(event.target.value)}
        >
          {data.users_by_pk.groupsUsers.map((group: any) => {
            const { id, name } = group.group;

            return (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {isEditor && (
        <Button
          variant="contained"
          onClick={() => newGigVar(!newGigVar())}
          sx={{ backgroundColor: decorationColor }}
        >
          New gig
        </Button>
      )}

      <h5>{user?.name}</h5>

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
          label="Editor"
        />
      </FormGroup>

      {userControls}

      {user && (
        <img src={user?.picture} alt={user?.name} className="profile-picture" />
      )}
    </div>
  );
}
