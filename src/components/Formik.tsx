import { FormLabel, Input, Select, Switch, TextField } from '@mui/material';
import { useField } from 'formik';

//Text input
interface MyTextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const MyTextInput = (props: MyTextInputProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="d-flex flex-column my-3">
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

//Select
interface MySelectProps {
  label: string;
  name: string;
  children: any[];
}

export const MySelect = (props: MySelectProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="d-flex flex-column my-3">
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

//Checkbox
interface MyCheckboxProps {
  label: string;
  name: string;
  defaultChecked: boolean;
}

export const MyCheckbox = (props: MyCheckboxProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="my-2">
      <FormLabel htmlFor={props.name}>
        <Switch {...field} {...props} defaultChecked={props.defaultChecked} />
        {props.label}
      </FormLabel>

      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

//Text field
interface MyTextFieldProps {
  label: string;
  name: string;
  type: string;
}

export const MyTextField = (props: MyTextFieldProps) => {
  const [field] = useField(props);

  return (
    <FormLabel htmlFor={props.name} sx={{ height: 0.8, m: 2 }}>
      <TextField
        {...field}
        {...props}
        label={props.label}
        multiline
        minRows={10}
        maxRows={32}
        variant="outlined"
        className="position-fixed "
      />
    </FormLabel>
  );
};
