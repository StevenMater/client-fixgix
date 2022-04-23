import './App.css';
import { useState, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

//Components
import Test from './components/Test';
import NavBar from './NavBar/NavBar';
import { access } from 'fs';

//Env constants
const graphqlUri: string = process.env.REACT_APP_GRAPHQL_URI as string;
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE as string;
const scope: string = process.env.REACT_APP_AUTH0_SCOPE as string;

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const createApolloClient = (authToken: string) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: graphqlUri,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      cache: new InMemoryCache(),
    });
  };

  const [userMetadata, setUserMetadata] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'fixgix-dev.eu.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setAccessToken(accessToken);

        setUserMetadata(user_metadata);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const [client] = useState(createApolloClient(accessToken));

  //Logs
  console.log('accessToken :>> ', accessToken);
  console.log('userMetadata :>> ', userMetadata);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
      scope={scope}
      useRefreshTokens={true}
    >
      <ApolloProvider client={client}>
        <NavBar />
        <Test />
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;
