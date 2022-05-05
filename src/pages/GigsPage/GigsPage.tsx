import './gigs-page.css';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

//Components
import Loading from '../../components/Loading/Loading';
import GigDetailsPage from '../GigDetailsPage/GigDetailsPage';

//Constants
import { statusColorPicker } from '../../constants/functions';
import { groupIdVar, openGigIdVar, openGigVar } from '../../constants/cache';

//Queries
import { QUERY_GIGS_BY_GROUP_PK } from '../../constants/queries';
import { Avatar, AvatarGroup, Grid } from '@mui/material';

export default function GigsPage() {
  const groupId = useReactiveVar(groupIdVar);
  const openGig = useReactiveVar(openGigVar);

  const [
    gigsByGroup,
    {
      loading: gigsByGroupLoading,
      error: gigsByGroupError,
      data: gigsByGroupData,
    },
  ] = useLazyQuery(QUERY_GIGS_BY_GROUP_PK);

  const openGigCard = (id: any) => {
    openGigIdVar(id);

    openGigVar(true);
  };

  useEffect(() => {
    if (groupId) {
      gigsByGroup({
        variables: { groupId },
      });
    }
  }, [groupId]);

  if (gigsByGroupLoading || !gigsByGroupData) {
    return <Loading />;
  }

  if (gigsByGroupError) {
    console.error(gigsByGroupError);
    return <div>Error!</div>;
  }

  const { gigs } = gigsByGroupData.groups_by_pk;

  //Logs
  // console.log('groupId :>> ', groupId);
  // console.log('first', gigsByGroupData);
  // console.log('openGig', openGig);
  // console.log('openGigId :>> ', openGigId);

  return (
    <div className="card-container">
      {gigs.length === 0 ? (
        <h1>Start adding gix!</h1>
      ) : (
        <Grid container spacing="2" direction={'row'} alignItems={'flex-start'}>
          {gigs.map((gig: any) => {
            const { id, gigDate, gigTitle, gigStatus, gigsUsers } = gig;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <div onClick={() => openGigCard(id)} className="card">
                  <span
                    className="card-banner"
                    style={{ backgroundColor: statusColorPicker(gigStatus) }}
                  />
                  <div>
                    <h3 className="card-date">
                      <span>{gigDate}</span>
                    </h3>
                    <h4 className="card-title">
                      <span>{gigTitle}</span>
                    </h4>
                  </div>

                  <AvatarGroup max={8}>
                    {gigsUsers.map((user: any) => {
                      const { id, picture, firstName, lastName } = user.user;

                      return (
                        <Avatar
                          key={id}
                          alt={`${firstName} ${lastName}`}
                          src={picture}
                        />
                      );
                    })}
                  </AvatarGroup>
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
      {openGig && <GigDetailsPage />}
    </div>
  );
}
