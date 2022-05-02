import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../../components/LoginButton';

export default function LoginPage() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Please Log in to use FixGix</h1>
      <LoginButton />
    </div>
  );
}
