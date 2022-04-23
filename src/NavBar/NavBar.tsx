import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

export default function NavBar() {
  const { isAuthenticated } = useAuth0();

  const userControls: any = isAuthenticated ? (
    <LogoutButton />
  ) : (
    <LoginButton />
  );

  return (
    <div>
      <h3>FixGix</h3>
      {userControls}
    </div>
  );
}
