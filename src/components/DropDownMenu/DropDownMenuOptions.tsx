import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import { groupIdVar, isEditorVar, newGigVar } from '../../constants/cache';
import MenuIcon from '@mui/icons-material/Menu';
import { useReactiveVar } from '@apollo/client';

export default function MenuListComposition({
  groupsUsers,
}: {
  groupsUsers: any;
}) {
  const [open, setOpen] = useState(false);

  const groupId = useReactiveVar(groupIdVar);
  const isEditor = useReactiveVar(isEditorVar);

  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //Logs
  console.log('groupId', groupId);

  return (
    <Stack direction="row" spacing={2} sx={{ zIndex: 1000 }}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MenuIcon sx={{ fontSize: 50 }} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {isEditor && (
                      <MenuItem>
                        <Button
                          variant="contained"
                          onClick={() => newGigVar(!newGigVar())}
                        >
                          New gig
                        </Button>
                      </MenuItem>
                    )}

                    <MenuList>
                      {groupsUsers.map((group: any) => {
                        const { id, name } = group.group;

                        return (
                          <MenuItem
                            key={id}
                            value={id}
                            onClick={() => {
                              groupIdVar(id);
                              handleToggle();
                            }}
                          >
                            {name}
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
