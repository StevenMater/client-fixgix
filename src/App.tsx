import './App.css';
import { useState, useEffect } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

//Components
import Test from './components/Test';
import NavBar from './NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';

//Env constants
const graphqlUri: string = process.env.REACT_APP_GRAPHQL_URI as string;

function App() {
  const { user, getAccessTokenSilently } = useAuth0();

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

  // const [client] = useState(createApolloClient(accessToken));

  //Logs
  console.log('accessToken :>> ', accessToken);
  console.log('userMetadata :>> ', userMetadata);

  return (
    // <ApolloProvider client={client}>
    <div>
      <NavBar />
      <Test />
    </div>
    // </ApolloProvider>
  );
}

export default App;
