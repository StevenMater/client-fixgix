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
import DropDownMenu from '../DropDownMenu/DropDownMenuUser';
import DropDownMenuOptions from '../DropDownMenu/DropDownMenuOptions';

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const groupId = useReactiveVar(groupIdVar);
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

  const { email, firstName, lastName, picture, userName, groupsUsers } =
    data.users_by_pk;

  const fullName = `${firstName} ${lastName}`;

  const userDetails = {
    email: email,
    fullName: fullName,
    userName: userName,
    picture: picture,
  };

  //Logs
  // console.log('data', data);
  // console.log('user :>> ', user);
  // console.log('isEditor :>> ', isEditor);
  // console.log('isAuthenticated :>> ', isAuthenticated);
  // console.log('userId', userId);

  return (
    <div className="nav-bar-container">
      <DropDownMenuOptions groupsUsers={groupsUsers} />

      <h1>FixGix</h1>

      <DropDownMenu userDetails={userDetails} />
    </div>
  );
}
