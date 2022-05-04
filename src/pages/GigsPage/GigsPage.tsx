import './gigs-page.css';

import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import { useEffect } from 'react';
import { Autocomplete, Avatar, TextField } from '@mui/material';

//Components
import GigDetailsPage from '../GigDetailsPage/GigDetailsPage';

//GQL
import {
  QUERY_ALL_USERS,
  QUERY_GIGS_BY_GROUP_PK,
} from '../../constants/queries';

//Constants
import { groupIdVar, openGigIdVar, openGigVar } from '../../constants/cache';
import { statusColorPicker } from '../../constants/functions';

export default function GigsPage() {
  const groupId = useReactiveVar(groupIdVar);
  const openGig = useReactiveVar(openGigVar);

  const [
    getGigsByGroup,
    {
      loading: getGigsByGroupLoading,
      error: getGigsByGroupError,
      data: getGigsByGroupData,
    },
  ] = useLazyQuery(QUERY_GIGS_BY_GROUP_PK);

  const {
    loading: allUsersLoading,
    error: allUsersError,
    data: allUsersData,
  } = useQuery(QUERY_ALL_USERS);

  useEffect(() => {
    if (groupId) {
      getGigsByGroup({
        variables: { groupId },
      });
    }
  }, [groupId]);

  if (getGigsByGroupLoading || allUsersLoading || !getGigsByGroupData) {
    return <Loading />;
  }

  if (getGigsByGroupError) {
    console.error(getGigsByGroupError);
    return <div>Error!</div>;
  }

  if (allUsersError) {
    console.error(allUsersError);
    return <div>Error!</div>;
  }

  const { gigs, groupsUsers } = getGigsByGroupData.groups_by_pk;

  const openGigCard = (id: any) => {
    openGigIdVar(id);

    openGigVar(true);
  };

  //Logs;
  console.log('allUsersData :>> ', allUsersData);
  // console.log('groupId :>> ', groupId);
  // console.log('groupsUsers', groupsUsers[0].user);
  // console.log('openGig', openGig);
  // console.log('openGigId :>> ', openGigId);

  return (
    <div className="gigs-container">
      <div className="menu-container">
        {/* <div className="autocomplete-container"> */}
        <Autocomplete
          getOptionLabel={(option: any) => option.userName}
          options={allUsersData.users}
          // onChange={(e) => console.log('value', e.target.value)}
          sx={{
            width: 300,

            '& .MuiAutocomplete-listBox': {
              bgcolor: '#F0EAD6',
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add user to group"
              sx={{ bgcolor: '#F0EAD6', '& 	.MuiTextField-root': {} }}
            />
          )}
        />
        {/* </div> */}
        <div>
          <h4>Members:</h4>
          {groupsUsers.map((user: any) => {
            const { id, picture, firstName, lastName } = user.user;

            return (
              <Avatar
                key={id}
                alt={`${firstName} ${lastName}`}
                src={picture}
                // sx={{ width: 60, height: 60 }}
              />
            );
          })}
        </div>
      </div>
      <div className="card-container">
        {gigs.map((gig: any) => {
          const { id, gigDate, gigTitle, gigStatus } = gig;

          return (
            <div
              onClick={() => openGigCard(id)}
              key={id}
              className="card radialGradient"
            >
              <div
                className="card-banner"
                style={{ backgroundColor: statusColorPicker(gigStatus) }}
              ></div>
              <div>
                <h3 className="card-date">
                  <span>{gigDate}</span>
                </h3>
                <h4 className="card-title">
                  <span>{gigTitle}</span>
                </h4>
              </div>
            </div>
          );
        })}
      </div>
      {openGig && <GigDetailsPage />}
    </div>
  );
}
