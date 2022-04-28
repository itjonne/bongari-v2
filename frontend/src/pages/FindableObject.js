import { Box, Button, Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from '../components/Image';
import TopNavigation from '../components/TopNavigation';
import WikipediaInfo from '../components/WikipediaInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRIMARY } from '../config/theme';

const InfoBox = ({ object, handleClick }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        paddingTop: '16px',
        paddingBottom: '16px',
        borderBottom: 'thin solid',
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="h5" color={PRIMARY}>
          {object.name}
        </Typography>
        <Typography variant="h6" color="gray">
          {object.nameLatin}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <Button variant="contained" onClick={handleClick}>
          BONGAA
        </Button>
      </Box>
    </Container>
  );
};

InfoBox.propTypes = {
  object: PropTypes.shape({
    name: PropTypes.string,
    nameLatin: PropTypes.string,
  }),
  handleClick: PropTypes.func,
};

const FindableObject = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (object) => {
    // https://reactrouter.com/docs/en/v6/getting-started/concepts#history-and-locations
    navigate(`/add/${object.id}`, { state: { object, from: object.name } });
  };

  // TODO: Mitä tehdään ton Location.staten kanssa? onko epäselvä?
  return (
    <>
      <TopNavigation header={location.state.from} arrow handleClick={() => navigate(-1)} />
      {/* <HideOnScroll hide={hide} {...props}> */}
      <div>
        <Container sx={{ height: '100vw', width: '100vw' }} disableGutters>
          <Image type="large" object={location.state.object} />
        </Container>
        <InfoBox
          object={location.state.object}
          handleClick={() => handleClick(location.state.object)}
        />
      </div>
      {/* </HideOnScroll> */}
      <WikipediaInfo object={location.state.object} />
    </>
  );
};

export default FindableObject;
