import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useLocation } from 'react-router-dom';
// import Camera from './Camera';
import { Paper, createTheme } from '@mui/material';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

// const cameraWidth = 100;
/*
const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: 'none'
  },
  camera: {
    width: `${cameraWidth}px`,
  }
});
*/

// https://mui.com/customization/theme-components/
const theme = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          minWidth: '20px',
          paddingLeft: '0.1em',
          paddingRight: '0.1em',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          fontFamily: 'Luckiest Guy', // No more ripple, on the whole application 💣!
          fontSize: '12px',
          backgroundColor: '#006B5F',
          minWidth: '20px', // TODO: Miten tää responsiiviseks
          maxWidth: '400px',
          paddingTop: '6px',
          paddingLeft: '0.1em',
          paddingRight: '0.1em',
          '&.Mui-selected': {
            color: 'white',
          },
        },
        label: {
          fontFamily: 'Luckiest Guy',
          '&.Mui-selected': {
            color: 'white',
          },
        },
      },
    },
  },
});

const responsiveFontsTheme = responsiveFontSizes(theme); // Responsiiviseks

const BottomNavigationBar = () => {
  const location = useLocation();
  /* eslint-disable no-unused-vars */
  const pathname = location.pathname.startsWith('/object') ? '/gallery' : location.pathname;

  const [value, setValue] = useState(pathname ? pathname : '/home'); // TODO: Ei taida toimia?
  return (
    <Paper sx={{ width: '100%' }} elevation={3}>
      <ThemeProvider theme={responsiveFontsTheme}>
        <BottomNavigation
          value={pathname ? pathname : '/home'}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels>
          <BottomNavigationAction
            label="Koti"
            icon={<HomeRoundedIcon />}
            value="/home"
            component={Link}
            to="/home"
          />
          <BottomNavigationAction
            label="Löydä"
            icon={<ImageSearchRoundedIcon />}
            value="/gallery"
            component={Link}
            to="/gallery"
          />
          <BottomNavigationAction
            label="Kamera"
            icon={<CameraAltRoundedIcon />}
            value="/camera"
            component={Link}
            to="/camera"
          />
          <BottomNavigationAction
            label="Käyttäjä"
            icon={<PersonRoundedIcon />}
            value="/user"
            component={Link}
            to="/user"
          />
          <BottomNavigationAction
            label="Loki"
            icon={<MenuBookRoundedIcon />}
            value="/log"
            component={Link}
            to="/log"
          />
        </BottomNavigation>
      </ThemeProvider>

      {/* camera && <Camera width={cameraWidth} /> */}
    </Paper>
  );
};

export default BottomNavigationBar;
