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
import NavBar from './components/NavBar/NavBar';
import Welcome from './components/Welcome';

//Pages
import GigsPage from './components/GigsPage/GigsPage';
import GigDetailsPage from './components/GigDetailsPage/GigDetailsPage';

//Cache
import { isEditor } from './cache';
import Loading from './components/Loading/Loading';

//Env constants
const graphqlUri: string = process.env.REACT_APP_GRAPHQL_URI as string;
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [accessToken, setAccessToken] = useState('');
  const [userMetadata, setUserMetadata] = useState(null);

  const [client, setClient] = useState<any | undefined>(undefined);

  const getAccessToken = async () => {
    try {
      const accessToken: any = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user',
      });

      // console.log('accessToken :>> ', accessToken);

      setAccessToken(accessToken);
      return accessToken;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserMetadata = async () => {
    try {
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);

      // userMetadata.role === 'editor' ? isEditor(true) : isEditor(false);
    } catch (e: any) {
      console.log(e.message);
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
    if (accessToken) {
      getUserMetadata();
    }
  }, [accessToken]);

  if (client === undefined) return <Loading />;

  //Logs
  // console.log('client :>> ', client);
  // console.log('accessToken :>> ', accessToken);
  // console.log('userMetadata :>> ', userMetadata);
  // console.log('isLoading :>> ', isLoading);
  // console.log('isEditor :>> ', isEditor());

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar />
        {/* <Test /> */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/fixgix" element={<GigsPage />} />
          <Route path="/gigs/:gigId" element={<GigDetailsPage />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;

// TEST FROM HERE//////////////////////////////////////////////////////////////////////////////////////////////

//   useEffect(() => {
//     if (!isLoading && isAuthenticated) navigate('/fixgix');
//   }, [isLoading, isAuthenticated]);

//   const getAccessTokenTest = async () => {
//     try {
//       const accessToken: any = await getAccessTokenSilently({
//         audience: `https://${domain}/api/v2/`,
//         scope: 'read:current_user',
//       });

//       // console.log('accessToken :>> ', accessToken);

//       setAccessToken(accessToken);
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getAccessTokenTest();
//   }, []);

//   if (isLoading)
//     return (
//       <div>
//         <div>Loading...</div>
//       </div>
//     );

//   // useEffect(() => {
//   //   setClient(client);
//   // }, [accessToken]);

//   //CONDITIONAL RENDERING
//   // if (!user) {
//   //   return (
//   //     <div>
//   //       <Welcome />
//   //     </div>
//   //   );
//   // }

//   // if (client === undefined)
//   //   return (
//   //     <div>
//   //       <div>Loading...</div>
//   //     </div>
//   //   );

//

//   return (
//     <div>
//       {accessToken && (
//         <ApolloProvider
//           client={
//             new ApolloClient({
//               link: new HttpLink({
//                 uri: graphqlUri,
//                 headers: `Bearer ${accessToken}`,
//               }),
//               cache: new InMemoryCache(),
//             })
//           }
//         >
//           <NavBar />
//           {/* <Test /> */}
//           <Routes>
//             <Route path="/" element={<Welcome />} />
//             <Route path="/fixgix" element={<GigsPage />} />
//           </Routes>
//         </ApolloProvider>
//       )}
//     </div>
//   );
// }

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
