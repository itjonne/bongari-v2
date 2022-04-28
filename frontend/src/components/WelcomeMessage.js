import { Box, Typography } from '@mui/material';

const WelcomeMessage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '12px 8px 24px 8px',
        padding: '4px',
        borderStyle: 'solid',
        borderRadius: '12px',
      }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5">Moikka Anni!</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">
          Toivottavasti löydät hienoja otuksia. Onnea matkaan!
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeMessage;
