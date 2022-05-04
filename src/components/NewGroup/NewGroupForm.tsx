import './new-group-form.css';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { groupIdVar } from '../../constants/cache';
import {
  MUTATION_ADD_GROUP,
  MUTATION_LINK_GROUP_USER,
} from '../../constants/mutations';
import { MyTextInput } from '../Formik';
import Loading from '../Loading/Loading';

export default function NewGroupForm({ title }: { title: string }) {
  const [
    addGroup,
    { loading: loadingAddGroup, error: errorAddGroup, data: dataAddGroup },
  ] = useMutation(MUTATION_ADD_GROUP);

  const [
    linkGroupUser,
    { loading: loadingLinkGroupUser, error: errorLinkGroupUser },
  ] = useMutation(MUTATION_LINK_GROUP_USER);

  useEffect(() => {
    if (!loadingAddGroup && dataAddGroup) {
      const groupId = dataAddGroup.insert_groups_one.id;

      linkGroupUser({ variables: { groupId } }).then(() => groupIdVar(groupId));
    }
  }, [loadingAddGroup, dataAddGroup]);

  if (loadingAddGroup || loadingLinkGroupUser) return <Loading />;

  if (errorAddGroup || errorLinkGroupUser)
    return <div>`Submission error! ${errorAddGroup?.message}`</div>;

  //Logs
  // console.log('data', data);
  return (
    <div className="new-group-form-container">
      <h1>{title}</h1>
      <Formik
        initialValues={{
          name: '',
          websiteUrl: '',
          pictureUrl: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          websiteUrl: Yup.string(),
          pictureUrl: Yup.string(),
        })}
        onSubmit={(values) => {
          // console.log('values', values);

          const { name, websiteUrl, pictureUrl } = values;

          addGroup({
            variables: {
              name,
              websiteUrl,
              pictureUrl,
            },
          });
        }}
      >
        <Form className="form-container px-3">
          <MyTextInput
            label="Group name"
            name="name"
            type="text"
            placeholder="What is the name of your group?"
          />

          <MyTextInput
            label="Website URL"
            name="websiteUrl"
            type="text"
            placeholder="What is the URL of your groups website?"
          />

          <MyTextInput
            label="Logo URL"
            name="pictureUrl"
            type="text"
            placeholder="What is the URL of your groups logo?"
          />

          <Button variant="contained" type="submit" className="m-3">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
