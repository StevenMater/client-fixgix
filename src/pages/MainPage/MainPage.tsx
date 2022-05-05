import './main-page.css';
import { useEffect } from 'react';
import { Autocomplete, Avatar, AvatarGroup, TextField } from '@mui/material';
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from '@apollo/client';

//Components
import Loading from '../../components/Loading/Loading';
import GigsPage from '../GigsPage/GigsPage';

//Queries
import {
  QUERY_ALL_USERS,
  QUERY_GIGS_BY_GROUP_PK,
  QUERY_GROUP_BY_PK,
} from '../../constants/queries';
import { MUTATION_LINK_GROUP_USER } from '../../constants/mutations';

//Constants
import { groupIdVar } from '../../constants/cache';

export default function MainPage() {
  const groupId = useReactiveVar(groupIdVar);

  const [
    groupByPk,
    { loading: groupByPkLoading, error: groupByPkError, data: groupByPkData },
  ] = useLazyQuery(QUERY_GROUP_BY_PK);

  const {
    loading: allUsersLoading,
    error: allUsersError,
    data: allUsersData,
  } = useQuery(QUERY_ALL_USERS);

  const [
    linkGroupUser,
    { loading: linkGroupUserLoading, error: linkGroupUserError },
  ] = useMutation(MUTATION_LINK_GROUP_USER, {
    refetchQueries: [QUERY_GIGS_BY_GROUP_PK],
  });

  useEffect(() => {
    if (groupId) {
      groupByPk({
        variables: { groupId },
      });
    }
  }, [groupId]);

  //Conditional rendering
  if (
    groupByPkLoading ||
    !groupByPkData ||
    allUsersLoading ||
    linkGroupUserLoading
  ) {
    return <Loading />;
  }

  if (groupByPkError) {
    console.error(allUsersError);
    return <div>Error!</div>;
  }

  if (allUsersError) {
    console.error(allUsersError);
    return <div>Error!</div>;
  }

  if (linkGroupUserError) {
    console.error(linkGroupUserError);
    return <div>Error!</div>;
  }

  //Data manipulation
  const { groupsUsers } = groupByPkData.groups_by_pk;
  const { users } = allUsersData;

  const groupsUsersPks = groupsUsers.map((user: any) => user.user.id);

  const filteredUsers = users.filter(
    (newUser: any) => !groupsUsersPks.includes(newUser.id)
  );

  //   //Logs;
  //   console.log('users :>> ', users);
  //   console.log('groupId :>> ', groupId);
  //   console.log('groupByPkData', groupByPkData);
  //   console.log('groupsUsers :>> ', groupsUsers);
  //   console.log('groupsUsersPks :>> ', groupsUsersPks);
  //   console.log('filteredUsers :>> ', filteredUsers);

  return (
    <div className="menu-container">
      <div className="group-members-container">
        <h5>Group members:</h5>
        <AvatarGroup max={8}>
          {groupsUsers.map((user: any) => {
            const { id, picture, firstName, lastName } = user.user;

            return (
              <Avatar key={id} alt={`${firstName} ${lastName}`} src={picture} />
            );
          })}
        </AvatarGroup>
      </div>

      <Autocomplete
        options={filteredUsers}
        isOptionEqualToValue={(option, value) =>
          option.userName === value.userName
        }
        getOptionLabel={(option: any) => option.userName}
        renderOption={(option: any, props: any) => {
          const { id, userName, picture } = props;

          return (
            <li
              key={id}
              className="autocomplete-option"
              onClick={() =>
                linkGroupUser({ variables: { userId: id, groupId } })
              }
            >
              <Avatar
                key={id}
                alt={userName}
                src={picture}
                sx={{ marginRight: 1 }}
              />
              <div>{userName}</div>
            </li>
          );
        }}
        sx={{
          width: 300,
        }}
        renderInput={(params) => (
          <TextField {...params} label="Add member to group" />
        )}
      />

      <GigsPage />
    </div>
  );
}
