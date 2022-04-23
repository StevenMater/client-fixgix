import { gql } from '@apollo/client';

export const getTests = gql`
  query getTests {
    users {
      id
    }
  }
`;
