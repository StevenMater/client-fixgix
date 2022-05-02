import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { decorationColor } from '../constants/colors';

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={() => logout({ returnTo: 'http://localhost:3000/login' })}
      sx={{ backgroundColor: decorationColor }}
    >
      Log out
    </Button>
  );
}
