import ImageListItem from '@mui/material/ImageListItem';
import Image from './Image';
import ImageGalleryHeader from './ImageGalleryHeader';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useCallback, memo, useState, useEffect } from 'react';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';

// https://markoskon.com/displaying-hundreds-of-images-with-react-window-and-gatsby-image/
// https://stackoverflow.com/questions/57017935/react-window-how-to-pass-props-to-row-in-fixedsizelistrow-fixedsizelist
// eslint-disable-next-line react/display-name
const Cell = memo(({ columnIndex, rowIndex, style, data }) => {
  const CELL_GAP = 1;
  const { objects, columnCount, handleClick } = data;
  const singleColumnIndex = columnIndex + rowIndex * columnCount;
  const object = objects[singleColumnIndex];

  // Tällä tehdään gapit. En tiedäo nko järkevä?!
  const styles = {
    ...style,
    left: columnIndex === 0 ? style.left : Number(style.left) + columnIndex * CELL_GAP,
    right: columnIndex === columnCount ? style.right : Number(style.right) + columnIndex * CELL_GAP,
    top: rowIndex === 0 ? style.top : Number(style.top) + rowIndex * CELL_GAP,
  };

  return (
    <div style={styles} onClick={() => handleClick(object)}>
      {object && <Image type="square-name" object={object} />}
    </div>
  );
}, areEqual);

// TODO: ADD LAzy load
const ImageGallery = ({ getObjects, handleClick, handleSort, sortBy }) => {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [objects, setObjects] = useState([]);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    setObjects(getObjects());
  }, [filter]);

  // TODO: SIISTI! Nyt hakee nimi, latinanimi, subcategory
  const searchFilter = useCallback(() => {
    if (search.length < 3) return objects;
    return objects.filter(
      (object) =>
        object.name.toLowerCase().includes(search.toLowerCase()) ||
        object.subcategory.toLowerCase().includes(search.toLowerCase()) ||
        object.nameLatin.toLowerCase().includes(search.toLowerCase())
    );
  }, [objects, search]);

  const calculateColumnCount = () => {
    if (windowWidth <= 500) return 3;
    if (windowWidth <= 700) return 4;
    if (windowWidth <= 900) return 5;
    return 6;
  };

  const calculateRowHeight = useCallback(() => {
    const cols = calculateColumnCount();
    const gap = 1;
    const galleryWidth = windowWidth >= 1200 ? 1200 : windowWidth;
    return galleryWidth / cols - ((cols - 1) * gap) / 3;
  }, [windowWidth]);

  // https://markoskon.com/displaying-hundreds-of-images-with-react-window-and-gatsby-image/

  /* eslint-disable-next-line  */
  const createImageList = useCallback(() => {
    console.log('creating images');
    return objects.map((object) => (
      <ImageListItem
        sx={{ width: calculateRowHeight() }}
        key={object.name}
        onClick={() => handleClick(object)}>
        <Image type="square-name" object={object} />
      </ImageListItem>
    ));
  }, [objects, calculateRowHeight, handleClick]);

  console.log('search', search);
  console.log('filtered', searchFilter(objects));

  if (objects.length === 0) return <LoadingComponent />;

  return (
    <>
      <ImageGalleryHeader
        handleSort={handleSort}
        sortBy={sortBy}
        search={search}
        setSearch={setSearch}
      />
      {/*
      <ImageList sx={{ width: '100%' }} cols={3} gap={1} rowHeight={calculateRowHeight()}>
        {createImageList()}
      </ImageList>
        */}
      <AutoSizer defaultWidth={windowWidth} defaultHeight={windowHeight}>
        {({ width, height }) => {
          const cardWidth = calculateRowHeight();
          const cardHeight = calculateRowHeight();
          const columnCount = calculateColumnCount(); // Ehkä muuttaa isompaan?
          const rowCount = Math.ceil(objects.length / columnCount);
          return (
            <Grid
              className="grid"
              style={{ overflowX: 'hidden' }}
              width={width}
              height={height}
              columnCount={columnCount}
              columnWidth={cardWidth}
              rowCount={rowCount}
              rowHeight={cardHeight}
              itemData={{ objects: searchFilter(objects), columnCount, handleClick }}>
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </>
  );
};

export default ImageGallery;
