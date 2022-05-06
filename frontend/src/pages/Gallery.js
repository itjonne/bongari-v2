import { Container, Box } from '@mui/material';
import Categories from '../components/Categories';
import TopNavigation from '../components/TopNavigation';
// import useWindowDimensions from '../hooks/useWindowDimensions';
import { useCallback, useState, useEffect, memo, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategory, setSort } from '../reducers/filter/filterSlice';
import LoadingComponent from '../components/LoadingComponent';

const ImageGallery = lazy(() => import('../components/ImageGallery'));

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const filter = useSelector((state) => state.filter);
  const sortProperties = [
    { name: 'name', description: 'Nimi' },
    { name: 'points', description: 'Pisteet' },
  ];
  const dispatch = useDispatch();

  // const [selected, setSelected] = useState(filter.category);
  // const [sortProperty, setSortProperty] = useState(filter.sort);
  // const { windowHeight, windowWidth } = useWindowDimensions();
  const objects = useSelector((state) => state.objects);
  const navigate = useNavigate();

  const handleSelected = (name) => {
    dispatch(setCategory(name));
  };

  const handleClick = (object) => {
    // https://reactrouter.com/docs/en/v6/getting-started/concepts#history-and-locations
    navigate(`/object/${object.id}`, { state: { object, from: 'Gallery' } });
  };

  const handleSort = () => {
    dispatch(setSort(filter.sort >= sortProperties.length - 1 ? 0 : filter.sort + 1));
    // setSortProperty(sortProperty >= sortProperties.length - 1 ? 0 : sortProperty + 1);
  };

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  const sortBy = (property) => {
    let sortOrder = 1;
    console.log('direction', filter.direction);
    if (filter.direction === '-') {
      sortOrder = -1;
      // property = property.substr(1);
    }
    if (property === 'observationCount') {
      sortOrder = -1;
    }
    return (a, b) => {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  const getObjects = useCallback(() => {
    console.log('filter', filter.category);
    // console.log('objects', objects[filter.category]);
    if (!objects) return [];
    if (filter.category === 'Kaikki') {
      const all = [];
      for (let key of Object.keys(objects)) {
        all.push(...objects[key]);
      }
      const objs = all.sort(sortBy(sortProperties[filter.sort].name));
      return objs;
      //return categories.Linnut.sort(sortBy(sortProperties[sortProperty]));
    }
    // https://stackoverflow.com/questions/41051302/react-and-redux-uncaught-error-a-state-mutation-was-detected-between-dispatche
    const objs = [...objects[filter.category]].sort(sortBy(sortProperties[filter.sort].name));
    return objs;
  }, [objects, filter.category, sortProperties]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading === true) {
    return (
      <Container disableGutters sx={{ height: '100%', overflow: 'hidden' }}>
        <TopNavigation header="Löydä" />
        <Categories objects={objects} selected={filter.category} handleSelected={handleSelected} />
        <LoadingComponent />
      </Container>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden', overflowY: 'scroll', height: '100%' }}>
      <TopNavigation header="Löydä" />
      <Categories objects={objects} selected={filter.category} handleSelected={handleSelected} />
      {/* ==== LADATAAN TÄÄ VASTA KU TARVITAAN ==== TODO: Teepä tää ehkä kaikkiin ?! */}
      <Suspense fallback={<LoadingComponent />}>
        <ImageGallery
          getObjects={getObjects}
          handleClick={handleClick}
          handleSort={handleSort}
          sortBy={sortProperties[filter.sort]}
        />
      </Suspense>
    </Box>
  );
};

export default memo(Gallery);
