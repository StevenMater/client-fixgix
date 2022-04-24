import { useQuery } from '@apollo/client';
import { getTests } from '../graphql/queries';

export default function Test() {
  const TestsQuery = () => {
    const { loading, error, data } = useQuery(getTests);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      console.error(error);
      return <div>Error!</div>;
    }

    return console.log('data :>> ', data.tests);
  };

  // TestsQuery();

  //Logs

  //   if (!user || isLoading) return <div>'Loading...'</div>;

  //   if (isLoading) return <div>'Loading...'</div>;

  return <div>TEST</div>;
}
