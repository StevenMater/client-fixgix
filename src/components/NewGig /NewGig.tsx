import './new-gig.css';

import { useReactiveVar } from '@apollo/client';

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

//Cache
import { newGigVar } from '../../constants/cache';

import { forwardRef } from 'react';
import NewGigForm from './NewGigForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewGig() {
  const open = useReactiveVar(newGigVar);

  const close = () => newGigVar(false);

  //Logs
  // console.log('data', data);
  // console.log('loading', loading);
  // console.log('error :>> ', error);
  // console.log('groupId', groupId);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <div className="overflow-auto">
          <AppBar sx={{ position: 'fixed' }}>
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

              <Button
                form="new-gig"
                type="submit"
                color="inherit"
                className="fixed"
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <NewGigForm close={() => close()} />
        </div>
      </Dialog>
    </div>
  );
}
