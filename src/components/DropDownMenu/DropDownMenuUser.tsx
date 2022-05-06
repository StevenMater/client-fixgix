import { Fragment, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';

//MUI
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

//Constants
import { mainTextColor } from '../../constants/colors';
import { isEditorVar } from '../../constants/cache';

export default function DropDownMenuUser({
  userDetails,
}: {
  userDetails: any;
}) {
  const { email, fullName, userName, picture } = userDetails;
  const { logout } = useAuth0();

  const isEditor = useReactiveVar(isEditorVar);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              alt={fullName || userName}
              src={picture}
              sx={{
                width: 75,
                height: 75,
                border: 3,
                borderColor: mainTextColor,
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 35,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar alt={fullName || userName} src={picture} /> {email}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => logout({ returnTo: 'http://localhost:3000/login' })}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <Divider />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                // defaultChecked
                color="warning"
                checked={isEditorVar() === true}
                onChange={() => isEditorVar(!isEditor)}
                sx={{ marginLeft: 2 }}
              />
            }
            label="Manager"
          />
        </FormGroup>
      </Menu>
    </Fragment>
  );
}
