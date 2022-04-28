import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../reducers/user/userSlice';

export default function Signup() {
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const done = dispatch(register(registerData));
    // eslint-disable-next-line no-console
    // const done = await asyncSignup(data.get('email'), data.get('password'));
    if (!done) {
      setError('Ongelmia kirjautumisen kanssa, virheellinen sähköposti tai salasana.');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100%' }}>
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Rekisteröidy
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Sähköposti"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Salasana"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <Typography variant="body1" color="red">
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Rekisteröidy
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={() => navigate('/login')} variant="outlined">
                Oletko jo jäsen? Kirjaudu sisään.
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
