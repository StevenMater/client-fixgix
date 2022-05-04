import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Button, MenuItem } from '@mui/material';

import {
  MyCheckbox,
  MySelect,
  MyTextField,
  MyTextInput,
} from '../../components/Formik';

//Components
import Loading from '../../components/Loading/Loading';

//Constants
import { date } from '../../constants/cache';
import { MUTATION_UPDATE_GIG } from '../../constants/mutations';
import { QUERY_GIG_BY_PK } from '../../constants/queries';
import { useEffect, useState } from 'react';

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
    // gigsUsers,
    // updated_at,
  } = gigData.gigs_by_pk;

  const [updateGig, { loading, error }] = useMutation(MUTATION_UPDATE_GIG, {
    refetchQueries: [QUERY_GIG_BY_PK],
  });

  if (loading) return <Loading />;

  if (error) return <div>`Submission error! ${error?.message}`</div>;

  //Logs
  // console.log('error', error);
  // console.log('id', id);
  // console.log('data', data);

  return (
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
      onSubmit={(values, {}) => {
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
        <div className="row">
          <div>
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

            {/* <MyTextField label="Notes" name="gigNotes" type="text" /> */}

            <Button variant="contained" type="submit" className="m-3">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

// return (
//   <div className="p-3 d-flex flex-column">
//     <div className="details-block rounded">
//       <h4>
//         <u>Common details</u>
//       </h4>
//       <p>Date: {gigDate}</p>
//       <p>Title: {gigTitle}</p>
//       <p>Occasion: {gigOccasion}</p>
//       <p>Important guests: {gigImportantGuests}</p>
//       <p>Parking: {gigIsParking ? 'yes' : 'no'}</p>
//       <p>Dinner: {gigIsDinner ? 'yes' : 'no'}</p>
//       <p>Pay: €{gigPayMembers},-</p>
//     </div>
//     <div className="details-block rounded">
//       <h4>
//         <u>Show details</u>
//       </h4>
//       <p>Dresscode: {showDressCode}</p>
//       <p>Number of sets: {showAmountOfSets}</p>
//       <p>XL: {showExtraXL ? 'yes' : 'no'}</p>
//       <p>DJ: {showExtraDJ ? 'yes' : 'no'}</p>
//     </div>
//     <div className="details-block rounded">
//       <h4>
//         <u>Times</u>
//       </h4>
//       <p>Check in sound: {timeCheckInSoundEngineer}</p>
//       <p>Check in group: {timeCheckInGroup}</p>
//       <p>Soundcheck: {timeSoundCheck}</p>
//       <p>Ready for show: {timeReadyForShow}</p>
//       <p>Dinner: {timeDinner}</p>
//       <p>
//         Show: {timeShowStart} to {timeShowEnd}
//       </p>
//       <p>Check out: {timeCheckOut}</p>
//     </div>
//   </div>
// );
