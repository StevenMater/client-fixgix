import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={() => logout({ returnTo: 'http://localhost:3000/login' })}
    >
      Log out
    </Button>
  );
}
