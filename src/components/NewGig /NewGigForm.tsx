import './new-gig.css';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';

import { Button, MenuItem } from '@mui/material';

//Queries
import { date, groupIdVar } from '../../constants/cache';
import { QUERY_GIGS_BY_GROUP_PK } from '../../constants/queries';

import {
  MUTATION_ADD_GIG,
  MUTATION_LINK_GIG_USER,
} from '../../constants/mutations';

//Components
import Loading from '../Loading/Loading';
import { MyCheckbox, MySelect, MyTextField, MyTextInput } from '../Formik';

export default function NewGigForm({ close }: { close: any }) {
  const groupId = useReactiveVar(groupIdVar);

  const [
    addGig,
    { data: dataAddGig, loading: loadingAddGig, error: errorAddGig },
  ] = useMutation(MUTATION_ADD_GIG);

  const [
    linkGigUser,
    { loading: loadingLinkGigUser, error: errorLinkGigUser },
  ] = useMutation(MUTATION_LINK_GIG_USER, {
    refetchQueries: [QUERY_GIGS_BY_GROUP_PK],
  });

  useEffect(() => {
    if (!loadingAddGig && dataAddGig) {
      const gigId = dataAddGig.insert_gigs.returning[0].id;

      linkGigUser({ variables: { gigId } }).then(() => close());
    }
  }, [loadingAddGig, dataAddGig]);

  if (loadingAddGig || loadingLinkGigUser) return <Loading />;

  if (errorAddGig || errorLinkGigUser)
    return <div>`Submission error! ${errorAddGig?.message}`</div>;

  return (
    <Formik
      initialValues={{
        gigStatus: '',
        gigTitle: '',
        gigDate: '',
        gigOccasion: '',
        gigImportantGuests: '',
        gigIsParking: false,
        gigIsDinner: false,
        gigPayMembers: 0,
        showDressCode: '',
        showAmountOfSets: 1,
        showExtraXL: false,
        showExtraDJ: false,
        timeCheckInSoundEngineer: '',
        timeCheckInGroup: '',
        timeSoundCheck: '',
        timeReadyForShow: '',
        timeDinner: '',
        timeShowStart: '',
        timeShowEnd: '',
        timeCheckOut: '',
        gigNotes: '',
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
        } = values;

        addGig({
          variables: {
            groupId,
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
          },
        });
      }}
    >
      <Form className="form-container px-3">
        <div className="row">
          <div className="col-12 col-md-10">
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
              defaultChecked={false}
            />

            <MyCheckbox
              label="Dinner provided"
              name="gigIsDinner"
              defaultChecked={false}
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
              defaultChecked={false}
            />

            <MyCheckbox
              label="Additional - DJ"
              name="showExtraDJ"
              defaultChecked={false}
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

            <Button variant="contained" type="submit" className="m-3">
              Save
            </Button>
          </div>
          <div className="col-12 col-md-2">
            <MyTextField label="Notes" name="gigNotes" type="text" />
          </div>
        </div>
      </Form>
    </Formik>
  );
}
