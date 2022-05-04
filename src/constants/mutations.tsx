import { gql } from '@apollo/client';

export const MUTATION_ADD_GIG = gql`
  mutation (
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
    insert_gigs_one(
      object: {
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
      id
    }
  }
`;

export const MUTATION_UPDATE_GIG = gql`
  mutation (
    $id: uuid = ""
    $gigStatus: String = ""
    $gigTitle: String = ""
    $gigDate: String = ""
    $gigOccasion: String = ""
    $gigImportantGuests: String = ""
    $gigIsParking: Boolean = false
    $gigIsDinner: Boolean = false
    $gigPayMembers: Int = 0
    $showDressCode: String = ""
    $showAmountOfSets: Int = 1
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
  ) {
    update_gigs_by_pk(
      pk_columns: { id: $id }
      _set: {
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
      }
    ) {
      id
      updated_at
    }
  }
`;

// $gigNotes: String = ""

// gigNotes: $gigNotes

export const MUTATION_LINK_GIG_USER = gql`
  mutation ($gigId: uuid = "") {
    insert_gigsUsers_one(object: { gigId: $gigId }) {
      id
    }
  }
`;

export const MUTATION_ADD_GROUP = gql`
  mutation (
    $name: String = ""
    $websiteUrl: String = ""
    $pictureUrl: String = ""
  ) {
    insert_groups_one(
      object: { name: $name, websiteUrl: $websiteUrl, pictureUrl: $pictureUrl }
    ) {
      id
    }
  }
`;

export const MUTATION_LINK_GROUP_USER = gql`
  mutation ($groupId: uuid = "") {
    insert_groupsUsers_one(object: { groupId: $groupId, isManager: true }) {
      id
      isManager
    }
  }
`;
