import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user/userSlice';

export default function Login() {
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // TODO: Kannattaako salasanaa tallentaa muuttujaan? Tietoturva?!
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const done = dispatch(login(loginData));
    // const done = await asyncLogin(data.get('email'), data.get('password'));
    if (!done) {
      setError('Virheelliset Tiedot');
    } else {
      navigate('/');
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
          Kirjaudu sisään
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Muista minut"
          />
          {error && (
            <Typography variant="body1" color="red">
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Kirjaudu
          </Button>
          <Grid container>
            <Grid item xs>
              <Button onClick={() => alert('ei toteutettu')} variant="outlined">
                Unohtuiko salasana? TODO
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => navigate('/register')} variant="outlined">
                Ei vielä tunnuksia? Rekisteröidy.
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
