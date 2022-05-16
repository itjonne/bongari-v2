import { Box } from '@mui/material';
import logo from '../logo.jpg';
import { spin } from '../animations/spin';
import { fillContainer } from '../config/styles';

const LoadingComponent = () => {
  return (
    <Box sx={{ ...fillContainer, alignItems: 'center', justifyContent: 'center' }}>
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
    </Box>
  );
};

export default LoadingComponent;
