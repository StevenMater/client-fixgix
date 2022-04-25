import { makeVar, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { MyGroups } from '../graphql/queries';

//Components
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

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

  const filterVar = makeVar(data.groups[0].name);

  //Logs

  console.log('filterVar :>> ', filterVar());

  console.log('data :>> ', data.groups);

  return (
    <div>
      <h3>FixGix</h3>
      <select onChange={(event) => filterVar(event.target.value)}>
        {isAuthenticated &&
          data.groups.map((group: any) => (
            <option key={group.id}>{group.name}</option>
          ))}
      </select>
      {userControls}
    </div>
  );
}
