import { gql } from '@apollo/client';

export const QUERY_GROUPS_BY_USER_PK = gql`
  query ($userId: String = "") {
    users_by_pk(id: $userId) {
      id
      email
      userName
      firstName
      lastName
      isManager
      picture
      groupsUsers {
        id
        group {
          id
          name
        }
      }
    }
  }
`;

export const QUERY_GIGS_BY_GROUP_PK = gql`
  query ($groupId: uuid = "") {
    groups_by_pk(id: $groupId) {
      id
      gigs(order_by: { gigDate: asc }) {
        id
        gigStatus
        gigTitle
        gigDate
        gigsUsers {
          id
          user {
            id
            userName
            picture
          }
        }
      }
    }
  }
`;

export const QUERY_GROUP_BY_PK = gql`
  query ($groupId: uuid = "") {
    groups_by_pk(id: $groupId) {
      id
      name
      pictureUrl
      groupsUsers {
        id
        user {
          id
          email
          userName
          firstName
          lastName
          picture
        }
      }
    }
  }
`;

export const QUERY_GIG_BY_PK = gql`
  query ($gigId: uuid = "") {
    gigs_by_pk(id: $gigId) {
      id
      gigStatus
      gigTitle
      gigDate
      gigOccasion
      gigImportantGuests
      gigIsParking
      gigIsDinner
      gigPayMembers
      showDressCode
      showAmountOfSets
      showExtraXL
      showExtraDJ
      timeCheckInSoundEngineer
      timeCheckInGroup
      timeSoundCheck
      timeReadyForShow
      timeDinner
      timeShowStart
      timeShowEnd
      timeCheckOut
      updated_at
      gigsUsers {
        id
        user {
          id
          firstName
          lastName
          userName
          picture
          email
        }
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query {
    users {
      id
      picture
      userName
    }
  }
`;
