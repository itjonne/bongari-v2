import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url('/images/forest.jpg')`,
        backgroundSize: 'cover',
      }}>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 8px 2px 8px',
            backgroundColor: 'white',
            borderStyle: 'solid',
            marginTop: '44px',
            lineHeight: 1,
          }}>
          <Typography variant="logo">BONGARI</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ marginBottom: '8px' }}>
          <Typography variant="logoWhite" sx={{ lineHeight: 1 }}>
            Aloita luonnossa seikkailu jo tänään!
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6border">
            Löydä sisäinen bongarisi ja tutki luonnon monimuotoisuutta.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
          }}>
          <Button onClick={handleLogin} variant="contained" sx={{ borderStyle: 'solid' }}>
            Kirjaudu sisään
          </Button>
          <Typography onClick={handleSignup} variant="body1" color="common.white">
            Etkö ole vielä jäsen? Rekisteröidy tästä.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Splash;
