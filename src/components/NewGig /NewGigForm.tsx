import './new-gig.css';

import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';

import {
  Box,
  Button,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';

//Queries
import { date, groupIdVar } from '../../constants/cache';
import {
  ADD_GIG,
  GET_GIGS_BY_GROUP,
  LINK_GIG_USER,
} from '../../constants/queries';

//Components
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

interface MyTextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const MyTextInput = (props: MyTextInputProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="d-flex flex-column my-2">
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

interface MySelectProps {
  label: string;
  name: string;
  children: any[];
}

const MySelect = (props: MySelectProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="d-flex flex-column my-2">
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

interface MyCheckboxProps {
  label: string;
  name: string;
}

const MyCheckbox = (props: MyCheckboxProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="my-1">
      <FormLabel htmlFor={props.name}>
        <Switch {...field} {...props} />
        {props.label}
      </FormLabel>

      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

interface MyTextFieldProps {
  label: string;
  name: string;
  type: string;
}

const MyTextField = (props: MyTextFieldProps) => {
  const [field] = useField(props);

  return (
    <div className="w-100">
      <FormLabel htmlFor={props.name} />
      <TextField
        {...field}
        {...props}
        label={props.label}
        multiline
        rows={32}
        // id="outlined-basic"
        variant="outlined"
        className="mt-3 position-fixed "
      />
    </div>
    // </FormLabel>
  );
};

export default function NewGigForm({ close }: { close: any }) {
  const navigate = useNavigate();

  const groupId = useReactiveVar(groupIdVar);

  const [
    addGig,
    { data: dataAddGig, loading: loadingAddGig, error: errorAddGig },
  ] = useMutation(ADD_GIG);

  const [
    linkGigUser,
    { loading: loadingLinkGigUser, error: errorLinkGigUser },
  ] = useMutation(LINK_GIG_USER, {
    refetchQueries: [GET_GIGS_BY_GROUP],
  });

  useEffect(() => {
    if (!loadingAddGig && dataAddGig) {
      const gigId = dataAddGig.insert_gigs.returning[0].id;

      linkGigUser({ variables: { gigId } })
        // .then(() => navigate('/'))
        .then(() => close());
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
        console.log('values', values);

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
      <Form className="px-5">
        <div className="row">
          <div className="col-12 col-md-10">
            <MySelect label="Gig status" name="gigStatus">
              <MenuItem value="requested">Requested</MenuItem>
              <MenuItem value="offered">Offered</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="afterSale">After sale</MenuItem>
            </MySelect>

            <h4 className="p-3">Common details</h4>

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

            <MyCheckbox label="Parking available" name="gigIsParking" />

            <MyCheckbox label="Dinner provided" name="gigIsDinner" />

            <MyTextInput
              label="Pay"
              name="gigPayMembers"
              type="number"
              placeholder="How much do members get paid?"
            />

            <h4 className="p-3">Show details</h4>

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

            <MyCheckbox label="Additional - XL" name="showExtraXL" />

            <MyCheckbox label="Additional - DJ" name="showExtraDJ" />

            <h4 className="p-3">Schedule details</h4>

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
