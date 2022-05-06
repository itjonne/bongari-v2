import { Container } from '@mui/material';
import TopNavigation from '../components/TopNavigation';

import useWindowDimensions from '../hooks/useWindowDimensions';

import UserInfo from '../components/UserInfo';
import LoadingComponent from '../components/LoadingComponent';
import { Suspense } from 'react';

const User = () => {
  /* eslint-disable no-unused-vars */
  const { windowHeight, windowWidth } = useWindowDimensions();

  // TODO: Laita kaikkien sivujen korkeudeks 100vh - NAVIGATION
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        height: '100%',
      }}>
      <TopNavigation header="Käyttäjä" haslogout />
      <Suspense fallback={<LoadingComponent />}>
        <UserInfo />
      </Suspense>
    </Container>
  );
};

export default User;
