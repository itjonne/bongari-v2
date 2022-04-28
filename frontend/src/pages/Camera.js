import { Typography, Box } from '@mui/material';
import TopNavigation from '../components/TopNavigation';

const Camera = () => {
  return (
    <>
      <TopNavigation header="Kamera" />
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="h6">Kamera ei valitettavasti vielä toimi.</Typography>
      </Box>
    </>
  );
};

export default Camera;
