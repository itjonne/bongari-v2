import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import theme from './config/theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
// import LoadingScreen from './components/LoadingScreen';
import BottomNavigationBar from './components/BottomNavigationBar';
import { fetchObjects } from './services/objects';
import { initialize } from './reducers/objects/objectsSlice';
import LoadingComponent from './components/LoadingComponent';
import { ThemeProvider } from '@emotion/react';
import Gallery from './pages/Gallery';
import FindableObject from './pages/FindableObject';
import User from './pages/User';
import Log from './pages/Log';
import Camera from './pages/Camera';
import AddFindForm from './pages/AddFindForm';
import { getFinds } from './services/finds';
import { initializeFinds } from './reducers/finds/findsSlice';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Splash from './pages/Splash';

const Home = lazy(() => import('./pages/Home'));

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const finds = useSelector((state) => state.finds);

  // GET objects
  useEffect(() => {
    const asyncFetchAndInitialize = async () => {
      const data = await fetchObjects();
      dispatch(initialize(data));
    };
    asyncFetchAndInitialize();
  }, [dispatch]);

  // GET FINDS
  useEffect(() => {
    const asyncGetFinds = async () => {
      console.log('fetching finds from user');
      const data = await getFinds(user);
      console.log('data returned from finds', data);
      dispatch(initializeFinds(data));
    };
    // Tää on nyt ihan tyhmä, muuten se latas aina ku lisäs pisteitä.
    console.log(finds);
    if (!finds.length) asyncGetFinds();
  }, [dispatch, user]);

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container
            component="main"
            maxWidth="lg"
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            disableGutters>
            <Container
              component="section"
              sx={{
                flex: '1',
                overflowY: 'scroll',
              }}
              disableGutters>
              <Routes>
                <Route path="/splash" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                {/* Ohimenevät */}
                {/* Ohimenevät */}
                <Route path="*" element={<Navigate to="/splash" />} />
              </Routes>
            </Container>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          disableGutters>
          <Container
            component="section"
            sx={{
              flex: '1',
              overflowY: 'scroll',
            }}
            disableGutters>
            <Routes>
              <Route
                path="/home"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/gallery"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <Gallery />
                  </Suspense>
                }
              />
              <Route
                path="/object/:objectId"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <FindableObject />
                  </Suspense>
                }
              />
              <Route
                path="/camera"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <Camera />
                  </Suspense>
                }
              />
              <Route
                path="/user"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <User />
                  </Suspense>
                }
              />
              <Route
                path="/log"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <Log />
                  </Suspense>
                }
              />
              <Route path="/add/:objectId" element={<AddFindForm />} />
              {/* Ohimenevät */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Container>
          <Container component="section" disableGutters>
            <BottomNavigationBar />
          </Container>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
