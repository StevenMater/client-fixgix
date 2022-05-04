import { gql } from '@apollo/client';

export const MUTATION_ADD_GIG = gql`
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

export const UPDATE_GIG = gql``;

export const MUTATION_LINK_GIG_USER = gql`
  mutation LINK_GIG_USER($gigId: uuid = "") {
    insert_gigsUsers(objects: { gigId: $gigId }) {
      returning {
        id
      }
    }
  }
`;
