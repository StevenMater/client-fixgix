import { useQuery, useReactiveVar } from '@apollo/client';
import * as React from 'react';
import moment from 'moment';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, AvatarGroup, Box, Grid } from '@mui/material';

//Components
import Loading from '../../components/Loading/Loading';
import GigsDetailsIsViewer from './GigsDetailsIsViewer';
import GigsDetailsIsEditor from './GigsDetailsIsEditor';

//Constants
import { openGigVar, openGigIdVar, isEditorVar } from '../../constants/cache';
import { QUERY_GIG_BY_PK } from '../../constants/queries';
import { statusColorPicker } from '../../constants/functions';

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
          <Box>
            <h3>{gigDate}</h3>
            <h4>{gigTitle}</h4>
          </Box>

          <Grid container spacing={0.1}>
            {gigsUsers.map((user: any) => {
              const { id, picture, firstName, lastName } = user.user;

              return (
                <Grid item xs={2} sm={1} md={0.7} lg={0.6} key={id}>
                  <Avatar
                    alt={`${firstName} ${lastName}`}
                    src={picture}
                    sx={{ marginTop: 0.4, border: 2, borderColor: 'white' }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </BootstrapDialogTitle>

        <DialogContent dividers>
          {isEditor ? (
            <GigsDetailsIsEditor gigData={data} />
          ) : (
            <GigsDetailsIsViewer gigData={data} />
          )}
        </DialogContent>

        {isEditor && (
          <DialogActions
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>Last updated: {moment(updated_at).format('lll')}</Box>

            <Button form="update-gig" type="submit">
              Save changes
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </div>
  );
}
