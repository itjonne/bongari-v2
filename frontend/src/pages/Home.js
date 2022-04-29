import { memo, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Container } from '@mui/material';
// import Categories from '../components/Categories';
import Leaderboard from '../components/Leaderboard';
import LoadingComponent from '../components/LoadingComponent';
import TopNavigation from '../components/TopNavigation';
import WelcomeMessage from '../components/WelcomeMessage';
import { setCategory } from '../reducers/filter/filterSlice';

// const ImageListLarge = lazy(() => import('../components/ImageListLarge'));

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const objects = useSelector((state) => state.objects);
  const user = useSelector((state) => state.user);
  const filter = useSelector((state) => state.filter);

  if (!user) navigate('/splash');

  /* eslint-disable no-unused-vars */
  const handleCategory = (name) => {
    dispatch(setCategory(name));
  };

  /* eslint-disable no-unused-vars */
  const getObjects = useCallback(
    (start, end) => {
      if (!objects) return [];
      console.log('getobjects category', filter.category);
      if (filter.category === 'Kaikki') {
        return objects.Linnut ? objects.Linnut.slice(start, end) : [];
      }
      return objects[filter.category].slice(start, end);
    },
    [objects, filter.category]
  );

  return (
    <>
      <TopNavigation header="Koti" />
      {/* <Categories objects={objects} selected={filter.category} handleSelected={handleCategory} /> */}
      <Suspense fallback={<LoadingComponent />}>
        <WelcomeMessage />
        {/*
        <ImageListLarge header="Alueeltasi Bongattua" getObjects={getObjects(0, 5)} />
        <ImageListLarge header="Suosituimmat" getObjects={getObjects(5, 10)} />
        <ImageListLarge header="Viimeisimmät" getObjects={getObjects(10, 15)} />
        */}
        <Leaderboard />
      </Suspense>
    </>
  );
};

export default memo(Home);
