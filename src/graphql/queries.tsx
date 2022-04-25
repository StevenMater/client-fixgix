import { gql } from '@apollo/client';

export const MyGroups = gql`
  query MyGroups {
    groups {
      id
      name
    }
  }
`;

export const getGigsByUser = gql`
  query MyQuery {
    users {
      firstName
      groupsUsers {
        group {
          name
          gigs {
            gigDate
          }
        }
      }
    }
  }
`;
