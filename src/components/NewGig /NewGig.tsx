import './new-gig.css';
import * as React from 'react';
import * as Yup from 'yup';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from 'formik';

//MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FormLabel, Input, MenuItem, Select, InputLabel } from '@mui/material';

//Cache
import { groupIdVar, newGigVar } from '../../constants/cache';

//Queries
import { AddGig, LinkGigUser } from '../../constants/queries';

interface MyTextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface MySelectProps {
  label: string;
  name: string;
  children: any[];
}

// interface MyCheckboxProps {
//   label;
// }

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyTextInput = (props: MyTextInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex flex-column p-3 w-75">
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

const MySelect = (props: MySelectProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex flex-column p-3 w-75">
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

// const MyCheckbox = ({ children, ...props }) => {
//   const [field, meta] = useField({ ...props, type: 'checkbox' });
//   return (
//     <div>
//       <InputLabel className="checkbox-input">
//         <Input type="checkbox" {...field} {...props} />
//         {children}
//       </InputLabel>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

export default function NewGig() {
  const groupId = useReactiveVar(groupIdVar);
  const open = useReactiveVar(newGigVar);

  const close = () => newGigVar(false);

  const [addGig, { data, loading, error }] = useMutation(AddGig);
  const [linkGigUser] = useMutation(LinkGigUser);

  //Logs
  // console.log('data', data);
  // console.log('loading', loading);
  // console.log('error :>> ', error);
  // console.log('groupId', groupId);

  if (loading) return <div>'Submitting...'</div>;

  if (error) return <div>`Submission error! ${error.message}`</div>;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New gig
            </Typography>

            <Button autoFocus color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Formik
          initialValues={{
            // amountOfSets: null,
            // dressCode: '',
            // extraDJ: false,
            // extraXL: false,
            gigDate: '',
            gigImportantGuests: '',
            gigOccasion: '',
            gigStatus: '',
            gigTitle: '',
            // isDinner: false,
            // isParking: false,
            // payMembers: null,
            // timeCheckInGroup: '',
            // timeCheckInSoundEngineer: '',
            // timeCheckOut: '',
            // timeDinner: '',
            // timeReadyForShow: '',
            // timeShowEnd: '',
            // timeShowStart: '',
            // timeSoundCheck: '',
          }}
          validationSchema={Yup.object({
            // showAmountOfSets: Yup.number()
            //   .integer('Must be a integer')
            //   .positive('Must be a positive number'),
            // gigDressCode: Yup.string(),
            // showDJ: Yup.boolean(),
            // showXL: Yup.boolean(),
            gigDate: Yup.string().required('Required'),
            gigImportantGuests: Yup.string(),
            gigOccasion: Yup.string(),
            gigStatus: Yup.string()
              .oneOf(
                ['requested', 'offered', 'confirmed', 'cancelled', 'afterSale'],
                'Invalid status'
              )
              .required('Required'),
            gigTitle: Yup.string().required('Required'),
            // gigIsDinner: Yup.boolean(),
            // gigIsParking: Yup.boolean(),
            // gigPayMembers: Yup.number().positive('Must be a positive number'),
            // timeCheckInGroup: Yup.string(),
            // timeCheckInSoundEngineer: Yup.string(),
            // timeCheckOut: Yup.string(),
            // timeDinner: Yup.string(),
            // timeReadyForShow: Yup.string(),
            // timeShowEnd: Yup.string(),
            // timeShowStart: Yup.string(),
            // timeSoundCheck: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // console.log('values', values);

            const {
              gigDate,
              gigTitle,
              gigOccasion,
              gigStatus,
              gigImportantGuests,
            } = values;

            addGig({
              variables: {
                groupId,
                gigDate,
                gigTitle,
                gigOccasion,
                gigStatus,
                gigImportantGuests,
              },
            });

            const gigId = data.insert_gigs.returning[0].id;

            console.log('gigId', gigId);

            linkGigUser({ variables: { gigId } });

            setSubmitting(false);
            close();
          }}
        >
          <Form>
            <MySelect label="Gig status" name="gigStatus">
              <MenuItem value="requested">Requested</MenuItem>
              <MenuItem value="offered">Offered</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="afterSale">After sale</MenuItem>
            </MySelect>

            <h3 className="p-3">Common details</h3>

            <MyTextInput
              label="Gig title"
              name="gigTitle"
              type="text"
              placeholder="Name your gig"
            />

            <MyTextInput
              label="Gig date"
              name="gigDate"
              type="text"
              placeholder="Date of your gig"
            />

            <MyTextInput
              label="Occasion"
              name="gigOccasion"
              type="text"
              placeholder="What is the reason for the party?"
            />

            <MyTextInput
              label="Important guests"
              name="gigImportantGuests"
              type="text"
              placeholder="Who is the party for?"
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
