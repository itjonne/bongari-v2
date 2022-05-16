import { Box } from '@mui/material';
import { spin } from '../animations/spin';
import { fillContainer } from '../config/styles';

const LoadingComponent = () => {
  return (
    <Box sx={{ ...fillContainer, alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component="img"
        sx={{
          animation: `${spin} infinite 20s linear`,
          pointerEvents: 'none',
          width: '192px', // TODO: Ehkä prosenteiks tms
          height: '192px',
        }}
        src="/images/logo.jpg"
        alt="logo"></Box>
    </Box>
  );
};

export default LoadingComponent;
