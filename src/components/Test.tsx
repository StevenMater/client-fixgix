import { useQuery, useReactiveVar } from '@apollo/client';
import { getGigsByUser } from '../constants/queries';

export default function Test() {
  // const test = useReactiveVar(filterVar);
  const { loading, error, data } = useQuery(getGigsByUser);

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
