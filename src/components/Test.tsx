import { useQuery } from '@apollo/client';
import { MyGigsByGroup } from '../constants/queries';
import Loading from './Loading/Loading';

export default function Test({ groupId }: { groupId: string }) {
  const { loading, error, data } = useQuery(MyGigsByGroup, {
    variables: { groupId },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  console.log('data', data);
  return data;
}
