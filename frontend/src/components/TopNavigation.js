import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user/userSlice';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/jsx-props-no-spreading */
const TopNavigation = ({ arrow, header, handleClick, haslogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    console.log('logging out');
    e.preventDefault();
    dispatch(logout());
    navigate('/splash');
  };

  return (
    <AppBar
      sx={{ display: 'flex', flexDirection: 'row' }}
      color="white"
      position="static"
      elevation={0}
      onClick={handleClick && handleClick}>
      <Toolbar>
        {arrow && (
          <Typography variant="h4" component="div">
            {'< '}
          </Typography>
        )}
        <Typography variant="h4" component="div">
          {header && header}
        </Typography>
        {haslogout && (
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
      <Toolbar />
    </AppBar>
  );
};

TopNavigation.propTypes = {
  arrow: PropTypes.bool,
  header: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default TopNavigation;
