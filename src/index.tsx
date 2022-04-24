import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

//Enc constants
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE as string;
const scope: string = process.env.REACT_APP_AUTH0_SCOPE as string;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    scope={scope}
    useRefreshTokens={true}
  >
    <App />
  </Auth0Provider>
);
