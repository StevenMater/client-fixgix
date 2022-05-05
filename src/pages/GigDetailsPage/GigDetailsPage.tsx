import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useQuery, useReactiveVar } from '@apollo/client';
import { openGigVar, openGigIdVar, isEditorVar } from '../../constants/cache';
import Loading from '../../components/Loading/Loading';
import { QUERY_GIG_BY_PK } from '../../constants/queries';
import GigsDetailsIsViewer from './GigsDetailsIsViewer';
import GigsDetailsIsEditor from './GigsDetailsIsEditor';
import { statusColorPicker } from '../../constants/functions';
import { Avatar, AvatarGroup } from '@mui/material';
import moment from 'moment';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  backgroundColor: string;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, backgroundColor, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, backgroundColor: backgroundColor }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'black',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const gigId = useReactiveVar(openGigIdVar);
  const isEditor = useReactiveVar(isEditorVar);
  const open = useReactiveVar(openGigVar);

  const handleClose = () => {
    openGigVar(false);
  };

  const { loading, error, data } = useQuery(QUERY_GIG_BY_PK, {
    variables: { gigId },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error.message);
    return <div>Error!</div>;
  }

  const { gigDate, gigTitle, gigStatus, gigsUsers, updated_at } =
    data.gigs_by_pk;

  //Logs
  // console.log('data', data);
  // console.log('gigUsers', gigsUsers);
  // console.log('updatedAt', updated_at);

  return (
    <div className="gigs-details-container">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={'md'}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          backgroundColor={statusColorPicker(gigStatus)}
        >
          <div>
            <h3>
              {gigDate} - {gigTitle}
            </h3>
            <h6>Last updated at: {moment(updated_at).format('DD-MM-YYYY')}</h6>
          </div>

          <AvatarGroup max={8} sx={{ flexDirection: 'row' }}>
            {gigsUsers.map((user: any) => {
              const { id, picture, firstName, lastName } = user.user;

              return (
                <Avatar
                  key={id}
                  alt={`${firstName} ${lastName}`}
                  src={picture}
                />
              );
            })}
          </AvatarGroup>
        </BootstrapDialogTitle>

        <DialogContent dividers>
          {isEditor ? (
            <GigsDetailsIsEditor gigData={data} />
          ) : (
            <GigsDetailsIsViewer gigData={data} />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
