import { gql } from '@apollo/client';

export const QUERY_GROUPS_BY_USER_PK = gql`
  query ($userId: String = "") {
    users_by_pk(id: $userId) {
      groupsUsers {
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
      name
      pictureUrl
      gigs(order_by: { gigDate: asc }) {
        id
        gigStatus
        gigTitle
        gigDate
      }
      groupsUsers {
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
