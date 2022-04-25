import './App.css';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

//Components
import Test from './components/Test';
import NavBar from './NavBar/NavBar';
import Welcome from './components/Welcome';

//Env constants
const graphqlUri: string = process.env.REACT_APP_GRAPHQL_URI as string;
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  // const [accessToken, setAccessToken] = useState('');
  // const [userMetadata, setUserMetadata] = useState(null);
  // const [headers, setHeaders] = useState<any>();

  const [client, setClient] = useState<any | undefined>(undefined);

  const getAccessToken = async () => {
    try {
      const accessToken: any = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user',
      });

      // console.log('accessToken :>> ', accessToken);

      // setAccessToken(accessToken);
      return accessToken;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // const getHeaders = () => {
  //   const headers: any = {};

  //   if (accessToken) {
  //     headers.Authorization = accessToken;
  //   }

  //   setHeaders(headers);
  //   // return headers;
  // };

  const createApolloClient = (accessToken: string) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: graphqlUri,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      cache: new InMemoryCache(),
    });
  };

  useEffect(() => {
    getAccessToken()
      .then((result: string) => createApolloClient(result))
      .then((result2: any) => setClient(result2))
      .catch(() => console.log('Client error'));
  }, []);

  // console.log('client :>> ', client);

  //USEEFFECT WITH TOKEN FETCH
  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: 'read:current_user',
  //       });

  //       setAccessToken(accessToken);

  //       // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

  //       // const metadataResponse = await fetch(userDetailsByIdUrl, {
  //       //   headers: {
  //       //     Authorization: `Bearer ${accessToken}`,
  //       //   },
  //       // });

  //       // const { user_metadata } = await metadataResponse.json();

  //       // setUserMetadata(user_metadata);
  //     } catch (e: any) {
  //       console.log(e.message);
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);

  //CONDITIONAL RENDERING
  // if (!user) {
  //   return (
  //     <div>
  //       <Welcome />
  //     </div>
  //   );
  // }

  if (client === undefined)
    return (
      <div>
        <div>Loading...</div>
      </div>
    );

  //CONST WITH APOLLOCLIENT
  // const client = new ApolloClient({
  //   link: new HttpLink({
  //     uri: graphqlUri,
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }),
  //   cache: new InMemoryCache(),
  // });

  //FUNCTION WITH APOLLOCLIENT
  // const createApolloClient = (authToken: string) => {
  //   return new ApolloClient({
  //     link: new HttpLink({
  //       uri: graphqlUri,
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     }),
  //     cache: new InMemoryCache(),
  //   });
  // };

  // const [client] = useState(createApolloClient(accessToken));
  // const client = createApolloClient(accessToken);

  //FUNCTION WITH TOKEN FETCH AND APOLLOCLIENT
  // const test = async () => {
  //   try {
  //     const domain = 'fixgix-dev.eu.auth0.com';

  //     const accessToken: string = await getAccessTokenSilently({
  //       audience: `https://${domain}/api/v2/`,
  //       scope: 'read:current_user',
  //     });

  //     console.log('accessToken :>> ', accessToken);

  //     if (!accessToken) {
  //       return null;
  //     }

  //     const client = new ApolloClient({
  //       link: new HttpLink({
  //         uri: graphqlUri,
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }),
  //       cache: new InMemoryCache(),
  //     });

  //     console.log('client :>> ', client);

  //     return client;
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  //Logs
  // console.log('accessToken :>> ', accessToken);
  // console.log('userMetadata :>> ', userMetadata);

  return (
    <ApolloProvider client={client}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/fixgix" element={<Test />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
