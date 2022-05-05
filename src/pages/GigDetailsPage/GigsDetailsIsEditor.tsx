import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import {
  Autocomplete,
  Avatar,
  Button,
  MenuItem,
  TextField,
} from '@mui/material';

import {
  MyCheckbox,
  MySelect,
  MyTextField,
  MyTextInput,
} from '../../components/Formik';

//Components
import Loading from '../../components/Loading/Loading';

//Constants
import { date, groupIdVar, userIdVar } from '../../constants/cache';
import {
  MUTATION_LINK_GIG_USER,
  MUTATION_UPDATE_GIG,
} from '../../constants/mutations';
import { QUERY_GIG_BY_PK, QUERY_GROUP_BY_PK } from '../../constants/queries';
import { useEffect } from 'react';

export default function GigsDetailsIsEditor({ gigData }: { gigData: any }) {
  const {
    id,
    gigStatus,
    gigTitle,
    gigDate,
    gigOccasion,
    gigImportantGuests,
    gigIsParking,
    gigIsDinner,
    gigPayMembers,
    showDressCode,
    showAmountOfSets,
    showExtraXL,
    showExtraDJ,
    timeCheckInSoundEngineer,
    timeCheckInGroup,
    timeSoundCheck,
    timeReadyForShow,
    timeDinner,
    timeShowStart,
    timeShowEnd,
    timeCheckOut,
    gigNotes,
    gigsUsers,
  } = gigData.gigs_by_pk;

  const groupId = useReactiveVar(groupIdVar);
  const gigId = id;

  const [
    getGroupByPk,
    { loading: groupByPkLoading, error: groupByPkError, data: groupByPkData },
  ] = useLazyQuery(QUERY_GROUP_BY_PK);

  const [updateGig, { loading: updateGigLoading, error: updateGigError }] =
    useMutation(MUTATION_UPDATE_GIG, {
      refetchQueries: [QUERY_GIG_BY_PK],
    });

  const [
    linkGigUser,
    {
      loading: linkGigUserLoading,
      error: linkGigUserError,
      data: linkGigUserData,
    },
  ] = useMutation(MUTATION_LINK_GIG_USER, {
    refetchQueries: [QUERY_GIG_BY_PK],
  });

  useEffect(() => {
    if (groupId) {
      getGroupByPk({
        variables: { groupId },
      });
    }
  }, [groupId]);

  //Conditional rendering
  if (
    updateGigLoading ||
    groupByPkLoading ||
    !groupByPkData ||
    linkGigUserLoading
  )
    return <Loading />;

  if (updateGigError) {
    console.error(updateGigError.message);
    return <div>Error!</div>;
  }

  if (groupByPkError) {
    console.error(groupByPkError.message);
    return <div>Error!</div>;
  }

  if (linkGigUserError) {
    console.error(linkGigUserError.message);
    return <div>Error!</div>;
  }

  //Data manipulation
  const { groupsUsers } = groupByPkData.groups_by_pk;

  const gigsUsersPks = gigsUsers.map((user: any) => user.user.id);

  const filteredUsers = groupsUsers.filter(
    (newUser: any) => !gigsUsersPks.includes(newUser.user.id)
  );

  //Logs
  // console.log('error', error);
  // console.log('id', id);
  // console.log('data', data);
  // console.log('gigsUsers', gigsUsers);
  // console.log('gigsUsersPks', gigsUsersPks);
  // console.log('groupsUsers', groupsUsers);
  // console.log('groupByPkData :>> ', groupByPkData);
  // console.log('filteredUsers :>> ', filteredUsers);
  // console.log('linkGigUserData :>> ', linkGigUserData);

  return (
    <div>
      <Autocomplete
        options={filteredUsers}
        isOptionEqualToValue={(option, value) =>
          option.userName === value.userName
        }
        getOptionLabel={(option: any) => option.user.userName}
        renderOption={(option: any, props: any) => {
          const { id, userName, picture } = props.user;

          return (
            <li
              key={id}
              className="autocomplete-option"
              onClick={() =>
                linkGigUser({ variables: { userId: id, gigId: gigId } })
              }
            >
              <Avatar
                key={id}
                alt={userName}
                src={picture}
                sx={{ marginRight: 1 }}
              />
              <div>{userName}</div>
            </li>
          );
        }}
        sx={{
          width: 300,
          margin: 2,
        }}
        renderInput={(params) => (
          <TextField {...params} label="Add member to group" />
        )}
      />

      <Formik
        enableReinitialize={true}
        initialValues={{
          gigStatus: gigStatus,
          gigTitle: gigTitle,
          gigDate: gigDate,
          gigOccasion: gigOccasion,
          gigImportantGuests: gigImportantGuests,
          gigIsParking: gigIsParking,
          gigIsDinner: gigIsDinner,
          gigPayMembers: gigPayMembers,
          showDressCode: showDressCode,
          showAmountOfSets: showAmountOfSets,
          showExtraXL: showExtraXL,
          showExtraDJ: showExtraDJ,
          timeCheckInSoundEngineer: timeCheckInSoundEngineer,
          timeCheckInGroup: timeCheckInGroup,
          timeSoundCheck: timeSoundCheck,
          timeReadyForShow: timeReadyForShow,
          timeDinner: timeDinner,
          timeShowStart: timeShowStart,
          timeShowEnd: timeShowEnd,
          timeCheckOut: timeCheckOut,
          gigNotes: gigNotes,
        }}
        validationSchema={Yup.object({
          gigStatus: Yup.string()
            .oneOf(
              ['requested', 'offered', 'confirmed', 'cancelled', 'afterSale'],
              'Invalid status'
            )
            .required('Required'),
          gigTitle: Yup.string().required('Required'),
          gigDate: Yup.date()
            .typeError('Must be a valid date in a "yyyy - mm - dd" format')
            .required('Required'),
          gigOccasion: Yup.string(),
          gigImportantGuests: Yup.string(),
          gigIsParking: Yup.boolean(),
          gigIsDinner: Yup.boolean(),
          gigPayMembers: Yup.number()
            .typeError('Must be a number')
            .moreThan(-1, 'Must be 0 or higher'),
          showDressCode: Yup.string(),
          showAmountOfSets: Yup.number()
            .typeError('Must be a number')
            .moreThan(0, 'Must be 1 or higher'),
          showExtraXL: Yup.boolean(),
          showExtraDJ: Yup.boolean(),
          timeCheckInSoundEngineer: Yup.string(),
          timeCheckInGroup: Yup.string(),
          timeSoundCheck: Yup.string(),
          timeReadyForShow: Yup.string(),
          timeDinner: Yup.string(),
          timeShowStart: Yup.string(),
          timeShowEnd: Yup.string(),
          timeCheckOut: Yup.string(),
          gigNotes: Yup.string(),
        })}
        onSubmit={(values) => {
          // console.log('values', values);

          const {
            gigStatus,
            gigTitle,
            gigDate,
            gigOccasion,
            gigImportantGuests,
            gigIsParking,
            gigIsDinner,
            gigPayMembers,
            gigNotes,
            showDressCode,
            showAmountOfSets,
            showExtraXL,
            showExtraDJ,
            timeCheckInSoundEngineer,
            timeCheckInGroup,
            timeSoundCheck,
            timeReadyForShow,
            timeDinner,
            timeShowStart,
            timeShowEnd,
            timeCheckOut,
          } = values;

          updateGig({
            variables: {
              id,
              gigStatus,
              gigTitle,
              gigDate,
              gigOccasion,
              gigImportantGuests,
              gigIsParking,
              gigIsDinner,
              gigPayMembers,
              gigNotes,
              showDressCode,
              showAmountOfSets,
              showExtraXL,
              showExtraDJ,
              timeCheckInSoundEngineer,
              timeCheckInGroup,
              timeSoundCheck,
              timeReadyForShow,
              timeDinner,
              timeShowStart,
              timeShowEnd,
              timeCheckOut,
            },
          });
        }}
      >
        <Form className="px-3">
          <MySelect label="Gig status" name="gigStatus">
            <MenuItem value="requested">Requested</MenuItem>
            <MenuItem value="offered">Offered</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="afterSale">After sale</MenuItem>
          </MySelect>

          <h4 className="pt-3">Common details</h4>

          <MyTextInput
            label="Title"
            name="gigTitle"
            type="text"
            placeholder="Give your gig a title"
          />

          <MyTextInput
            label="Date"
            name="gigDate"
            type="text"
            placeholder={date}
          />

          <MyTextInput
            label="Occasion"
            name="gigOccasion"
            type="text"
            placeholder="What is the reason for the gig?"
          />

          <MyTextInput
            label="Important guests"
            name="gigImportantGuests"
            type="text"
            placeholder="Who is the gig for?"
          />

          <MyCheckbox
            label="Parking available"
            name="gigIsParking"
            defaultChecked={gigIsParking}
          />

          <MyCheckbox
            label="Dinner provided"
            name="gigIsDinner"
            defaultChecked={gigIsDinner}
          />

          <MyTextInput
            label="Pay"
            name="gigPayMembers"
            type="number"
            placeholder="How much do members get paid?"
          />

          <h4 className="pt-3">Show details</h4>

          <MyTextInput
            label="Dresscode"
            name="showDressCode"
            type="text"
            placeholder="What should the groupmembers wear?"
          />

          <MyTextInput
            label="Amount of sets"
            name="showAmountOfSets"
            type="number"
            placeholder="How many sets will you play?"
          />

          <MyCheckbox
            label="Additional - XL"
            name="showExtraXL"
            defaultChecked={showExtraXL}
          />

          <MyCheckbox
            label="Additional - DJ"
            name="showExtraDJ"
            defaultChecked={showExtraDJ}
          />

          <h4 className="pt-3">Schedule</h4>

          <MyTextInput
            label="Check in sound engineer"
            name="timeCheckInSoundEngineer"
            type="text"
            placeholder="At what time does the sound engineer arrive?"
          />

          <MyTextInput
            label="Check in group"
            name="timeCheckInGroup"
            type="text"
            placeholder="At what time does the group arrive?"
          />

          <MyTextInput
            label="Sound check"
            name="timeSoundCheck"
            type="text"
            placeholder="At what time does the sound check start?"
          />

          <MyTextInput
            label="Ready for show"
            name="timeReadyForShow"
            type="text"
            placeholder="At what time do the preparations need to be complete?"
          />

          <MyTextInput
            label="Dinner"
            name="timeDinner"
            type="text"
            placeholder="At what time does dinner start?"
          />

          <MyTextInput
            label="Show start"
            name="timeShowStart"
            type="text"
            placeholder="At what time does the show start?"
          />

          <MyTextInput
            label="Show end"
            name="timeShowEnd"
            type="text"
            placeholder="At what time does the show end?"
          />

          <MyTextInput
            label="Check out"
            name="timeCheckOut"
            type="text"
            placeholder="At what time can you start cleaning up?"
          />

          <MyTextField label="Notes" name="gigNotes" type="text" />

          <Button variant="contained" type="submit">
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
