import { gql } from '@apollo/client';

export const MyGroups = gql`
  query MyGroups {
    groups {
      id
      name
    }
  }
`;

export const MyGigsByGroup = gql`
  query MyQuery($groupId: uuid = "") {
    groups_by_pk(id: $groupId) {
      id
      name
      pictureUrl
      gigs {
        id
        gigDate
        gigTitle
        gigStatus
      }
    }
  }
`;

export const MyGigById = gql`
  query MyGigById($gigId: uuid = "") {
    gigs_by_pk(id: $gigId) {
      amountOfSets
      dressCode
      extraDJ
      extraXL
      gigDate
      gigImportantGuests
      gigOccasion
      gigStatus
      gigTitle
      isDinner
      isParking
      payMembers
      timeCheckInGroup
      timeCheckInSoundEngineer
      timeCheckOut
      timeDinner
      timeReadyForShow
      timeShowEnd
      timeShowStart
      timeSoundCheck
      updated_at
      gigsUsers {
        user {
          id
          firstName
          lastName
          nickName
          picture
          email
        }
      }
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
