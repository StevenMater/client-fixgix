import './nav-bar.css';

import { useQuery, useReactiveVar } from '@apollo/client';
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
import { groupIdVar, isEditorVar, newGigVar } from '../../constants/cache';

//Queries
import { GET_GROUPS } from '../../constants/queries';

export default function NavBar() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth0();

  const filter = useReactiveVar(groupIdVar);
  const isEditor = useReactiveVar(isEditorVar);

  const { loading, error, data } = useQuery(GET_GROUPS);

  const userControls: any = isAuthenticated ? (
    <LogoutButton />
  ) : (
    <LoginButton />
  );

  useEffect(() => {
    if (data) {
      groupIdVar(data.groups[0].id);
    }
  }, [data]);

  //Logs
  // console.log('filterVar :>> ', filterVar());
  // console.log('filter :>> ', filter);
  // console.log('data :>> ', data.groups);
  // console.log('user :>> ', user);
  // console.log('isEditor :>> ', isEditor);
  // console.log('user.picture', user?.picture);

  if (!user || loading) {
    return <div className="nav-bar-loading"></div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const changeGroup = (groupId: string) => {
    groupIdVar(groupId);

    // navigate('/');
  };

  return (
    <div className="nav-bar-container d-flex flex-row align-items-center justify-content-around">
      {/* <div className="d-flex flex-row align-items-center justify-content-between w-75"> */}
      <NavLink to="/" className="navlink">
        <h3>FixGix</h3>
      </NavLink>

      <FormControl>
        <InputLabel>Group</InputLabel>
        <Select
          value={filter}
          label="Group"
          onChange={(event) => changeGroup(event.target.value)}
        >
          {isAuthenticated &&
            data.groups.map((group: any) => {
              const { id, name } = group;

              return (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      {isEditor && (
        <Button variant="contained" onClick={() => newGigVar(!newGigVar())}>
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
      {/* </div> */}
      {user && (
        <img src={user?.picture} alt={user?.name} className="profile-picture" />
      )}
    </div>
  );
}
