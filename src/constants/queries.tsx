import { gql } from '@apollo/client';

//Queries
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
      showAmountOfSets
      gigDressCode
      showExtraDJ
      showExtraXL
      gigDate
      gigImportantGuests
      gigOccasion
      gigStatus
      gigTitle
      gigIsDinner
      gigIsParking
      gigPayMembers
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

//Mutations
export const AddGig = gql`
  mutation AddGig(
    $gigDate: String = ""
    $gigImportantGuests: String = ""
    $gigOccasion: String = ""
    $gigStatus: String = ""
    $gigTitle: String = ""
    $groupId: uuid = ""
  ) {
    insert_gigs(
      objects: {
        gigDate: $gigDate
        gigImportantGuests: $gigImportantGuests
        gigOccasion: $gigOccasion
        gigStatus: $gigStatus
        gigTitle: $gigTitle
        groupId: $groupId
      }
    ) {
      returning {
        id
        gigDate
        gigImportantGuests
        gigOccasion
        gigStatus
        gigTitle
        groupId
      }
    }
  }
`;

export const LinkGigUser = gql`
  mutation MyMutation2($gigId: uuid = "") {
    insert_gigsUsers(objects: { gigId: $gigId }) {
      returning {
        id
      }
    }
  }
`;
