import './nav-bar.css';

import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { MyGroups } from '../../graphql/queries';

//Components
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import { filterVar } from '../../cache';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const { loading, error, data } = useQuery(MyGroups);

  if (!user || loading) {
    return <h3>FixGix</h3>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const userControls: any = isAuthenticated ? (
    <LogoutButton />
  ) : (
    <LoginButton />
  );

  filterVar(data.groups[0].id);

  //Logs
  // console.log('filterVar :>> ', filterVar());
  // console.log('data :>> ', data.groups);
  // console.log('user :>> ', user);

  return (
    <div className="nav-bar-container d-flex flex-row align-items-center justify-content-between">
      <NavLink to="/fixgix" className="navlink">
        <h3>FixGix</h3>
      </NavLink>
      <select onChange={(event) => filterVar(event.target.value)}>
        {isAuthenticated &&
          data.groups.map((group: any) => {
            const { id, name } = group;

            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
      </select>
      <h5>{user.name}</h5>
      {userControls}
      <img src={user.picture} alt={user.name} className="profile-picture" />
    </div>
  );
}
