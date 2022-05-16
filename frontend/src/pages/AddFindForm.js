import { useState, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fiLocale from 'date-fns/locale/fi';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TopNavigation from '../components/TopNavigation';
import ModalAddFindDialog from '../components/ModalAddFindDialog';
import Image from '../components/Image';

import { addFind } from '../reducers/finds/findsSlice';
// import { addPoints } from '../reducers/user/userSlice';

const AddFindForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [coordinates, setCoordinates] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  registerLocale('fi', fiLocale);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // dispatch(addFind({ user, object: location.state.object, body: {} }));
    // TODO: MItes rollbackin tilanteessa
    // dispatch(addPoints(location.state.object.points));
    navigate(-2); // Palataan pari askeltaa taaksepäin
  };

  const handleClickGeolocation = (e) => {
    e.preventDefault();
    function locationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          return 'User denied the request for geolocation.';
        case error.POSITION_UNAVAILABLE:
          return 'Location information is currently unavailable.';
        case error.TIMEOUT:
          return 'Request for user location timed out.';
        case error.UNKNOWN_ERROR:
          return 'An unknown error occurred.';
      }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setCoordinates(position.coords);
      },
      (error) => {
        console.log(locationError(error));
      },
      {
        timeout: 5000,
        maximumAge: 20000,
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // TODO: Avaa modal vaan jos menee läpi!
    if (data) {
      handleOpenModal(data);
      const body = {
        date: date,
        location: coordinates ? [coordinates.latitude, coordinates.longitude] : null,
        info: data.get('info'),
      };
      dispatch(addFind({ user, object: location.state.object, body }));
    }

    // navigate(-2); // Palataan pari askeltaa taaksepäin
  };

  const handleMap = (e) => {
    e.preventDefault();
    setCoordinates(null);
    alert('Ei osata vielä käyttää karttaa');
  };

  /* eslint-disable-next-line */
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <TextField id="date" name="date" label="Päivämäärä" value={value} onClick={onClick} ref={ref} />
  ));

  if (!location.state) navigate(-2);

  return (
    <Container disableGutters>
      <TopNavigation
        header={location.state.from ? location.state.from : 'Galleria'}
        arrow
        handleClick={() => navigate(-1)}
      />
      <Box sx={{ display: 'flex', padding: '12px 24px 24px 24px', gap: '24px' }}>
        <Image type="small" object={location.state.object} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">{location.state.object.name}</Typography>
          <Typography variant="h6" color="gray">
            {location.state.object.nameLatin}
          </Typography>
        </Box>
      </Box>
      <Box
        onSubmit={handleSubmit}
        component="form"
        name="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '12px',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexGrow: 1,
            }}>
            <DateRangeRoundedIcon sx={{ color: 'action.active' }} />
            <DatePicker
              locale="fi"
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              customInput={<CustomDateInput />}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexGrow: 1,
            }}>
            <AddLocationAltRoundedIcon sx={{ color: 'action.active' }} />
            <TextField
              id="location"
              label="Paikka"
              variant="outlined"
              value={coordinates ? 'Oma Sijainti' : 'Ei paikkatietoja'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle geolocation"
                      onClick={handleClickGeolocation}
                      color="primary"
                      edge="end">
                      <MyLocationIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button onClick={handleMap}>Kartta</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              gap: '8px',
              flexGrow: 1,
            }}>
            <InfoOutlinedIcon sx={{ color: 'action.active' }} />
            <TextField
              id="info"
              label="Lisätietoa"
              variant="outlined"
              multiline
              rows={4}
              name="info"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            gap: '12px',
          }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Kumoa
          </Button>
          <Button type="submit" variant="contained">
            Lisää
          </Button>
        </Box>
      </Box>
      <ModalAddFindDialog
        open={modalOpen}
        handleClose={handleCloseModal}
        object={location.state.object}
      />
    </Container>
  );
};

export default AddFindForm;
