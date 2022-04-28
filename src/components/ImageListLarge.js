import { Box, Container, Typography } from '@mui/material';
import Image from './Image';
import { useNavigate } from 'react-router-dom';

import { PRIMARY } from '../config/theme'; // TODO: Ei ehkä järkevin
import { useEffect, useState } from 'react';
import LoadingComponent from './LoadingComponent';
import { useSelector } from 'react-redux';

const SmallHeader = ({ text }) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginLeft: '24px' }}>
        {text}
      </Typography>
      <div style={{ height: '5px', width: 'min(40%, 200px)', backgroundColor: PRIMARY }} />
    </>
  );
};

const ImageListLarge = ({ header, getObjects }) => {
  const [objects, setObjects] = useState([]);
  const filter = useSelector((state) => state.filter);
  const navigate = useNavigate();

  useEffect(() => {
    setObjects(getObjects);
  }, [filter.category]);

  const handleClick = (object) => {
    console.log(object);
    navigate(`/object/${object.id}`, { state: { object, from: 'Home' } });
  };

  if (!objects.length) return <LoadingComponent />;

  return (
    <Container disableGutters sx={{ paddingBottom: '24px' }}>
      <SmallHeader text={header} />
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          width: '100%',
          paddingLeft: '24px',
          paddingRight: '24px',
          gap: '16px',
        }}>
        {objects &&
          objects.map((object, i) => {
            return <Image key={`${i}-image`} object={object} handleClick={handleClick} />;
          })}
      </Box>
    </Container>
  );
};

export default ImageListLarge;
