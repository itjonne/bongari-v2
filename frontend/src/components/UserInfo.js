import { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Divider, Tabs, Tab } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import theme, { PRIMARY } from '../config/theme';
import LoadingComponent from './LoadingComponent';
import { useNavigate } from 'react-router-dom';
import { setCategory } from '../reducers/filter/filterSlice';

const UserTabs = () => {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectedSx = { fontStyle: theme.typography.h6border };
  const notSelectedSx = { fontStyle: theme.typography.h6, color: 'gray' };

  return (
    <Box sx={{ width: '100%', backgroundColor: PRIMARY }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="white"
        indicatorColor="secondary"
        aria-label="tabs">
        <Tab sx={value === 'one' ? selectedSx : notSelectedSx} value="one" label="Bongaukset" />
        <Tab sx={value === 'two' ? selectedSx : notSelectedSx} value="two" label="Saavutukset" />
        <Tab sx={value === 'three' ? selectedSx : notSelectedSx} value="three" label="Kaverit" />
      </Tabs>
    </Box>
  );
};

const calculateFoundPercentage = (objects, finds) => {
  if (!objects) return 0;
  if (objects.length <= 0) return 0;
  return ((finds.length / objects.length) * 100).toFixed(0);
};

const CategoryInfo = ({ category, finds, divider }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/log');
    dispatch(setCategory(category.name));
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '16px',
          paddingLeft: '24px',
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
        onClick={handleClick}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute' }}
            color="light"
            size={60}
          />
          <CircularProgress
            variant="determinate"
            value={calculateFoundPercentage(category.objects, finds)}
            size={60}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography variant="h6" component="div" color="text.primary">
              {`
                ${
                  category.objects.length > 0
                    ? ((finds.length / category.objects.length) * 100).toFixed(0)
                    : 0
                }
                %
                `}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <Typography variant="h6">{category.name}</Typography>
          <Typography variant="body1" color="gray">
            Bongattu {finds.length}/{category.objects.length}
          </Typography>
        </Box>
        <Box sx={{ paddingRight: '24px', alignSelf: 'center' }}>
          <ChevronRightIcon />
        </Box>
      </Box>
      {divider && <Divider orientation="horizontal" />}
    </>
  );
};

CategoryInfo.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  finds: PropTypes.arrayOf(PropTypes.object).isRequired,
  divider: PropTypes.bool.isRequired,
};

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const categories = useSelector((state) => state.objects);
  const user = useSelector((state) => state.user);
  const finds = useSelector((state) => state.finds);
  console.log(user);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '0 24px 0 24px',
          gap: '24px',
          width: '100%',
        }}>
        <Avatar
          sx={{
            width: '100px',
            height: '100px',
            borderStyle: 'solid',
            borderWidth: 'thin',
          }}
          alt="profile-image"
          src="/images/sinitiainen.jpg"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">{user.email.split('@')[0]}</Typography>
          <Typography color="gray" variant="button">
            {user.location ? user.location : 'Ei Paikkatietoja'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', padding: '12px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            padding: '8px 0',
            gap: '2px',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant="h6">{user.points} p</Typography>
          <Typography variant="h6" color="gray">
            Pisteet
          </Typography>
        </Box>
        <Divider
          sx={{ borderColor: 'rgb(0,0,0, 1)', borderWidth: '1px' }}
          orientation="vertical"
          variant="fullWidth"
          flexItem
        />
        <Box
          sx={{
            display: 'flex',
            padding: '8px 0',
            flex: 1,
            gap: '2px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant="h6">{finds.length} kpl</Typography>
          <Typography variant="h6" color="gray">
            Bongaukset
          </Typography>
        </Box>
      </Box>
      <UserTabs />
      <Box sx={{ paddingTop: '8px' }}>
        {categories &&
          Object.keys(categories).map((category, i) => {
            return (
              <CategoryInfo
                key={category}
                category={{ name: category, objects: categories[category] }}
                finds={finds.filter((find) => find.category === category)}
                divider={i < Object.keys(categories).length - 1}
              />
            );
          })}
      </Box>
    </>
  );
};

export default UserInfo;
