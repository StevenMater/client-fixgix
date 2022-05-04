import './gigs-page.css';

import { useLazyQuery, useReactiveVar } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import { useEffect } from 'react';
import { Avatar } from '@mui/material';

//Components
import GigDetailsPage from '../GigDetailsPage/GigDetailsPage';

//GQL
import { QUERY_GIGS_BY_GROUP_PK } from '../../constants/queries';

//Constants
import { groupIdVar, openGigIdVar, openGigVar } from '../../constants/cache';
import { statusColorPicker } from '../../constants/functions';

export default function GigsPage() {
  const groupId = useReactiveVar(groupIdVar);

  const openGig = useReactiveVar(openGigVar);

  const [getGigsByGroup, { loading, error, data }] = useLazyQuery(
    QUERY_GIGS_BY_GROUP_PK
  );

  useEffect(() => {
    if (groupId) {
      getGigsByGroup({
        variables: { groupId },
      });
    }
  }, [groupId]);

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { name, gigs, groupsUsers } = data.groups_by_pk;

  const openGigCard = (id: any) => {
    openGigIdVar(id);

    openGigVar(true);
  };

  //Logs;
  // console.log('data :>> ', data);
  // console.log('groupId :>> ', groupId);
  // console.log('groupsUsers', groupsUsers[0].user);
  // console.log('openGig', openGig);
  // console.log('openGigId :>> ', openGigId);

  return (
    <div className="gigs-container">
      <div>
        <h4>Members:</h4>
        {groupsUsers.map((user: any) => {
          const { id, picture, firstName, lastName } = user.user;

          return (
            <Avatar
              key={id}
              alt={`${firstName} ${lastName}`}
              src={picture}
              sx={{ width: 60, height: 60 }}
            />
          );
        })}
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
