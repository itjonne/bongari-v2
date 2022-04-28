import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const PRIMARY = '#006B5F';
const SECONDARY = '#63FF8E';

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      paper: PRIMARY,
    },
    white: {
      main: '#ffffff',
    },
    black: {
      main: '#000000',
    },
    light: {
      main: '#ececec',
    },
  },
  typography: {
    logo: {
      fontFamily: 'Luckiest Guy',
      fontSize: '36px',
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': 'black',
      color: PRIMARY,
    },
    logoWhite: {
      fontFamily: 'Luckiest Guy',
      fontSize: '36px',
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': 'black',
      color: '#ffffff',
    },
    h4: {
      fontFamily: 'Luckiest Guy',
      fontSize: '24px',
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': 'black',
      color: PRIMARY,
    },
    h5: {
      fontFamily: 'Luckiest Guy',
      fontSize: '24px',
      letterSpacing: '1px', // Tätä pitää vähän fixata TODO:
    },
    h6: {
      fontFamily: 'Luckiest Guy',
      fontSize: '16px',
      lineHeight: '1.1',
    },
    h6border: {
      fontFamily: 'Luckiest Guy',
      fontSize: '16px',
      lineHeight: '1.1',
      letterSpacing: '1px',
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': 'black',
      color: '#ffffff',
    },
    button: {
      fontFamily: 'Luckiest Guy',
      fontSize: '14px',
      letterSpacing: '1.25px',
    },
    label: {
      fontFamily: 'Montserrat',
      fontSize: '18px',
      fontWeight: 900,
    },
    body1: {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      fontWeight: 500,
    },
    body2: {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
});

export default responsiveFontSizes(theme);
