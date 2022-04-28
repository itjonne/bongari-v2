import TopNavigation from '../components/TopNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import { setCategory } from '../reducers/filter/filterSlice';
import Categories from '../components/Categories';

const FindsList = lazy(() => import('../components/FindsList'));

const Log = () => {
  const dispatch = useDispatch();
  const finds = useSelector((state) => state.finds);
  const objects = useSelector((state) => state.objects);
  const filter = useSelector((state) => state.filter);

  /* eslint-disable no-unused-vars */
  const handleCategory = (name) => {
    dispatch(setCategory(name));
  };

  console.log('log finds', finds);
  return (
    <>
      <TopNavigation header="Loki" />
      <Categories objects={objects} selected={filter.category} handleSelected={handleCategory} />
      <Suspense fallback={<LoadingComponent />}>
        <FindsList finds={finds} />
      </Suspense>
    </>
  );
};

export default Log;
