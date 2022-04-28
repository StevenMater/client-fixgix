import './gigs-page.css';

import { useQuery, useReactiveVar } from '@apollo/client';
import { groupIdVar } from '../../constants/cache';
import { MyGigsByGroup } from '../../constants/queries';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

export default function GigsPage() {
  const groupId = useReactiveVar(groupIdVar);

  const { loading, error, data } = useQuery(MyGigsByGroup, {
    variables: { groupId },
  });

  //Logs;
  // console.log('data :>> ', data.groups_by_pk);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { name, gigs } = data.groups_by_pk;

  return (
    <div className="gigs-container d-flex flex-column p-3 mh-100">
      <div>
        <h3>{name}</h3>
      </div>
      <div className=" d-flex flex-wrap">
        {gigs.map((gig: any) => {
          const { id, gigDate, gigTitle, gigStatus } = gig;

          let borderColor: string;

          switch (gigStatus) {
            case 'requested': {
              borderColor = '#fff700';
              break;
            }
            case 'offered': {
              borderColor = '#fd7520';
              break;
            }
            case 'confirmed': {
              borderColor = '#5abd0f';
              break;
            }
            case 'cancelled': {
              borderColor = '#f34213';
              break;
            }
            case 'afterSale': {
              borderColor = '#190e96';
              break;
            }
            default: {
              borderColor = 'black';
            }
          }

          return (
            <NavLink
              to={`/gigs/${id}`}
              key={id}
              className="navlink card-container p-5 m-5 rounded"
              style={{ borderColor: borderColor }}
            >
              <p>Date: {gigDate}</p>
              <p>Title: {gigTitle}</p>
              <p>Status: {gigStatus}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
