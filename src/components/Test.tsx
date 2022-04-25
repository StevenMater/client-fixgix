import { useQuery, useReactiveVar } from '@apollo/client';
import { getGigsByUser } from '../graphql/queries';

export default function Test() {
  const { loading, error, data } = useQuery(getGigsByUser);
  // const test = useReactiveVar(filterVar);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  //Logs
  // console.log('test :>> ', test);
  return <div>{data.users[0].firstName}</div>;
  // return null;
}
