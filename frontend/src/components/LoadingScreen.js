import { Box, Typography } from '@mui/material';
import logo from '../logo.svg';
import { spin } from '../animations/spin';
import { fillScreen } from '../config/styles';

const LoadingScreen = () => {
  return (
    <Box sx={{ ...fillScreen, justifyContent: 'center', backgroundColor: 'lightGreen' }}>
      <Box
        component="img"
        sx={{
          animation: `${spin} infinite 20s linear`,
          height: '40vmin',
          width: '40vmin',
          pointerEvents: 'none',
        }}
        src={logo}
        alt="logo"></Box>
      <Typography variant="h5">Loading...</Typography>
    </Box>
  );
};

export default LoadingScreen;
