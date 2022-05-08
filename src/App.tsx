import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  useReactiveVar,
} from '@apollo/client';

//MUI
import { ThemeProvider } from '@mui/material';

//Components
import NavBar from './components/NavBar/NavBar';
import Loading from './components/Loading/Loading';
import NewGig from './components/NewGig /NewGig';
import LoginPage from './pages/LoginPage/LoginPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';

//Constants
import { groupIdVar, newGigVar, userIdVar } from './constants/cache';
import { theme } from './constants/colors';
const graphqlUri: string = process.env.REACT_APP_GRAPHQL_URI as string;
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE as string;

function App() {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const [client, setClient] = useState<any | undefined>(undefined);

  const newGig = useReactiveVar(newGigVar);
  const groupId = useReactiveVar(groupIdVar);

  const getAccessToken = async () => {
    try {
      const accessToken: any = await getAccessTokenSilently({
        audience: audience,
        scope: 'read:current_user',
      });

      // console.log('accessToken :>> ', accessToken);

      return accessToken;
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
      .then((token: string) => createApolloClient(token))
      .then((client: any) => setClient(client))
      .catch(() => console.log('Client error'));
  }, []);

  useEffect(() => {
    if (user) {
      userIdVar(user.sub);
    }
  }, [user]);

  if (isLoading || client === undefined) return <Loading />;

  const mainPage = groupId ? <MainPage /> : <WelcomePage />;

  //Logs
  // console.log('client :>> ', client);
  // console.log('accessToken :>> ', accessToken);
  // console.log('userMetadata :>> ', userMetadata);
  // console.log('isLoading :>> ', isLoading);
  // console.log('isEditor :>> ', isEditorVar());
  // console.log('newGig :>> ', newGig);
  // console.log('groupId', groupId);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={mainPage} />
        </Routes>
        {newGig && <NewGig />}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
