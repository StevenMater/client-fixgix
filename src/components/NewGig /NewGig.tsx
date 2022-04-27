import './new-gig.css';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { newGigVar } from '../../constants/cache';
import { useReactiveVar } from '@apollo/client';
import * as Yup from 'yup';
import { Form, Formik, useField } from 'formik';
import { FormLabel, Input } from '@mui/material';

interface MyTextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface MySelectProps {
  label: string;
  name: string;
  value: string;
}

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
    <>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="error" color="red">
          {meta.error}
        </div>
      )}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function NewGig() {
  const open = useReactiveVar(newGigVar);

  const close = () => newGigVar(false);

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

            <Button autoFocus color="inherit" onClick={close}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Formik
          initialValues={{
            amountOfSets: null,
            dressCode: '',
            extraDJ: false,
            extraXL: false,
            gigDate: '',
            gigImportantGuests: '',
            gigOccasion: '',
            gigStatus: '',
            gigTitle: '',
            isDinner: false,
            isParking: false,
            payMembers: null,
            timeCheckInGroup: '',
            timeCheckInSoundEngineer: '',
            timeCheckOut: '',
            timeDinner: '',
            timeReadyForShow: '',
            timeShowEnd: '',
            timeShowStart: '',
            timeSoundCheck: '',
          }}
          validationSchema={Yup.object({
            amountOfSets: Yup.number()
              .integer('Must be a integer')
              .positive('Must be a positive number'),
            dressCode: Yup.string(),
            extraDJ: Yup.boolean(),
            extraXL: Yup.boolean(),
            gigDate: Yup.string().required('Required'),
            gigImportantGuests: Yup.string(),
            gigOccasion: Yup.string(),
            gigStatus: Yup.string().oneOf(
              ['Requested', 'Offered', 'Confirmed', 'Cancelled', 'After sale'],
              'Invalid status'
            ),
            gigTitle: Yup.string().required('Required'),
            isDinner: Yup.boolean(),
            isParking: Yup.boolean(),
            payMembers: Yup.number().positive('Must be a positive number'),
            timeCheckInGroup: Yup.string(),
            timeCheckInSoundEngineer: Yup.string(),
            timeCheckOut: Yup.string(),
            timeDinner: Yup.string(),
            timeReadyForShow: Yup.string(),
            timeShowEnd: Yup.string(),
            timeShowStart: Yup.string(),
            timeSoundCheck: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MyTextInput
              label="Date"
              name="gigDate"
              type="text"
              placeholder="The date of your gig"
            />

            {/* <MyTextInput
             label="Last Name"
             name="lastName"
             type="text"
             placeholder="Doe"
           />
 
           <MyTextInput
             label="Email Address"
             name="email"
             type="email"
             placeholder="jane@formik.com"
           />
 
           <MySelect label="Job Type" name="jobType">
             <option value="">Select a job type</option>
             <option value="designer">Designer</option>
             <option value="development">Developer</option>
             <option value="product">Product Manager</option>
             <option value="other">Other</option>
           </MySelect>
 
           <MyCheckbox name="acceptedTerms">
             I accept the terms and conditions
        </MyCheckbox>

              <button type="submit">Submit</button>*/}
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
