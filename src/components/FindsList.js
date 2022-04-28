import { Avatar, Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { removeFind } from '../reducers/finds/findsSlice';

const Find = ({ find }) => {
  const objects = useSelector((state) => state.objects[find.category]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleModify = (e) => {
    e.preventDefault();
    alert('Ei vielä käytössä');
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (confirm('Haluatko varmasti poistaa löydön?') === true) {
      dispatch(removeFind({ user, find }));
      alert('Poistettu!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        gap: '8px',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '16px',
        }}>
        <Typography variant="h6">
          {objects.find((object) => object.id === find.objectId).name}
        </Typography>
        <Typography variant="h6" color="gray">
          {find.date.split('T')[0]}
        </Typography>
      </Box>
      <Typography variant="h6" color="red" onClick={handleModify}>
        Muokkaa
      </Typography>
      <Typography variant="h6" color="red" onClick={handleRemove}>
        Poista
      </Typography>
    </Box>
  );
};

Find.propTypes = {
  find: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

const Finds = ({ finds }) => {
  const objects = useSelector((state) => state.objects);
  let date = null;

  // TODO: PARANNA TOI PÄIVÄMÄÄRÄFUNKTIOSYSTEEMI, ottaa nyt vuoden, päivän ja kuukauden.
  const createFind = (found) => {
    const checkDateHeader = () => {
      if (date === null || found.date.split('T')[0] < date) {
        date = found.date.split('T')[0];
        return true;
      }
      date = found.date.split('T')[0];
      return false;
    };

    return (
      <Box key={found.id}>
        {checkDateHeader() && (
          <Box sx={{ paddingTop: '12px', paddingBottom: '8px' }}>
            <Typography variant="h6border">{found.date.split('T')[0]}</Typography>
          </Box>
        )}
        <Box
          key={found.objectId}
          sx={{ paddingBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: '56px',
              height: '56px',
              borderStyle: 'solid',
              borderWidth: 'thin',
            }}
            alt={`object-image-${found.objectId}`}
            src={`/images/${found.category}/thumbnails/${
              objects[found.category].find((object) => object.id === found.objectId).name
            }.png`}
          />
          <Find find={found} />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'scroll' }}>
      {finds.map((find) => {
        return createFind(find);
      })}
    </Box>
  );
};

Finds.propTypes = {
  finds: PropTypes.arrayOf(
    PropTypes.shape({
      objectId: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};

const FindsList = ({ finds }) => {
  const filter = useSelector((state) => state.filter);

  const filterFinds = (array) => {
    if (filter.category === 'Kaikki') return [...array];
    return array.filter((find) => find.category === filter.category);
  };

  if (filterFinds(finds).length) {
    return (
      <>
        <Box sx={{ display: 'flex', padding: '0 24px 12px 24px' }}>
          <Finds finds={filterFinds(finds).sort((a, b) => a.date < b.date)} />
        </Box>
      </>
    );
  } else {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="h6">Ei vielä bongauksia, mene ulos!</Typography>
      </Box>
    );
  }
};

export default FindsList;
