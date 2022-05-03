import { gql } from '@apollo/client';

//Queries
export const GET_GROUPS_BY_ID = gql`
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

export const GET_GIGS_BY_GROUP = gql`
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

export const GET_GIG_BY_ID = gql`
  query GET_GIG_BY_ID($gigId: uuid = "") {
    gigs_by_pk(id: $gigId) {
      showAmountOfSets
      showDressCode
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
          userName
          picture
          email
        }
      }
    }
  }
`;

//Mutations
export const ADD_GIG = gql`
  mutation ADD_GIG(
    $groupId: uuid = ""
    $gigStatus: String = ""
    $gigTitle: String = ""
    $gigDate: String = ""
    $gigOccasion: String = ""
    $gigImportantGuests: String = ""
    $gigIsParking: Boolean = false
    $gigIsDinner: Boolean = false
    $gigPayMembers: Int = 0
    $showDressCode: String = ""
    $showAmountOfSets: Int = 0
    $showExtraXL: Boolean = false
    $showExtraDJ: Boolean = false
    $timeCheckInSoundEngineer: String = ""
    $timeCheckInGroup: String = ""
    $timeSoundCheck: String = ""
    $timeReadyForShow: String = ""
    $timeDinner: String = ""
    $timeShowStart: String = ""
    $timeShowEnd: String = ""
    $timeCheckOut: String = ""
    $gigNotes: String = ""
  ) {
    insert_gigs(
      objects: {
        groupId: $groupId
        gigStatus: $gigStatus
        gigTitle: $gigTitle
        gigDate: $gigDate
        gigOccasion: $gigOccasion
        gigImportantGuests: $gigImportantGuests
        gigIsParking: $gigIsParking
        gigIsDinner: $gigIsDinner
        gigPayMembers: $gigPayMembers
        showDressCode: $showDressCode
        showAmountOfSets: $showAmountOfSets
        showExtraXL: $showExtraXL
        showExtraDJ: $showExtraDJ
        timeCheckInSoundEngineer: $timeCheckInSoundEngineer
        timeCheckInGroup: $timeCheckInGroup
        timeSoundCheck: $timeSoundCheck
        timeReadyForShow: $timeReadyForShow
        timeDinner: $timeDinner
        timeShowStart: $timeShowStart
        timeShowEnd: $timeShowEnd
        timeCheckOut: $timeCheckOut
        gigNotes: $gigNotes
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const LINK_GIG_USER = gql`
  mutation LINK_GIG_USER($gigId: uuid = "") {
    insert_gigsUsers(objects: { gigId: $gigId }) {
      returning {
        id
      }
    }
  }
`;

// $gigNotes: String = ""

// gigNotes: $gigNotes
