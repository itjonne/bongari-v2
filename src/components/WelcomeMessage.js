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
        <Typography variant="h5">Tervetuloa!</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt erat sit amet
          ultrices lacinia. Suspendisse nulla dui, scelerisque vitae magna non, rutrum accumsan
          neque. Proin convallis eleifend augue vitae commodo.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeMessage;
