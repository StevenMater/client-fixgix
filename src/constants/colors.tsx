import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#846f9e',
      main: '#664b86',
      dark: '#47345d',
      contrastText: '#F0EAD6',
    },
    secondary: {
      light: '#414141',
      main: '#121212',
      dark: '#0c0c0c',
      contrastText: '#F0EAD6',
    },
  },
});

//Gig colors
export const requested = '#fabd28';

export const offered = '#d87702';

export const cancelled = '#b51902';

export const confirmed = '#a6ab35';

export const afterSale = '#1c74e0';

//Main colors
export const mainBackgroundColor = '#0c0c0c';

export const secondaryBackgroundColor = '#121212';

export const alternativeColor = '#5fdd9d';

export const mainTextColor = '#F0EAD6';

export const decorationColor = '#b9d6f2';
