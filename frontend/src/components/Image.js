import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PRIMARY } from '../config/theme';

const Icon = ({ text, icon, size, found }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderStyle: 'solid',
        borderColor: 'white',
        backgroundColor: found === true ? 'rgb(0,107,95, 0.75)' : 'rgb(196, 196, 196, 0.75)',
        borderRadius: '50%',
        borderWidth: 'thin',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {icon && icon}
      {text && (
        <Typography variant={size === '36px' ? 'h5' : 'h6'} color="common.white">
          {text}
        </Typography>
      )}
    </Box>
  );
};

const Image = ({ type, object, handleClick }) => {
  const [found, setFound] = useState(false);
  // const [photoed, setPhotoed] = useState(false);
  // const [liked, setLiked] = useState(false);
  const userFinds = useSelector((state) => state.finds);

  useEffect(() => {
    const hasFound = userFinds.findIndex((find) => find.objectId === object.id);
    if (hasFound >= 0) {
      setFound(true);
    } else {
      setFound(false);
    }
    // setFound(userFinds.findIndex((find) => find.objectId === object.id));
  }, [userFinds, object]);

  const getLocalImage = () => {
    if (!object) return `url('/images/sinitiainen.jpg')`;
    return `url('/images/${object.category}/thumbnails/${object.name}.png')`;
  };

  const getRandomImage = () => {
    const images = [
      'Linnut.jpg',
      'Kalat.jpg',
      'Perhoset.jpg',
      'Puut & Pensaat.jpg',
      'Kukkakasvit.jpg',
      'Sienet.jpg',
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  if (type === 'small') {
    return (
      <Box
        sx={{
          width: '100px',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderStyle: 'solid',
          borderRadius: '50%',
          borderWidth: 'thin',
          marginTop: '8px',
          padding: '2px',
          backgroundImage: getLocalImage(),
          backgroundSize: 'cover',
        }}
      />
    );
  }

  const foundStyle = found ? {} : {}; // filter: 'grayscale(100%)'

  if (type === 'square') {
    return (
      <Box
        sx={{
          ...foundStyle,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderStyle: 'solid',
          borderWidth: 'thin',
          padding: '2px',
          backgroundImage: `url('images/${getRandomImage()}')`,
          backgroundSize: 'cover',
        }}>
        <Icon text={`${object.points}p`} size="24px" found={found} />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Icon
            icon={
              <Typography variant="h6" color="common.white">
                V
              </Typography>
            }
            size="24px"
            found
          />
          <Icon
            icon={
              <Typography variant="h6" color="common.white">
                K
              </Typography>
            }
            size="24px"
          />
          <Icon
            icon={
              <Typography variant="h6" color="common.white">
                T
              </Typography>
            }
            size="24px"
          />
        </Box>
      </Box>
    );
  }

  const nameStyle = found ? { backgroundColor: PRIMARY } : { backgroundColor: 'rgb(0,0,0, 0.4)' };

  if (type === 'square-name') {
    // ...style, todo mustavalkonen
    return (
      <Box
        sx={{
          ...foundStyle,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          backgroundImage: getLocalImage(),
          backgroundSize: 'cover',
          backgroundColor: 'gray',
        }}>
        <Icon sx={{ margin: '2px' }} text={`${object.points}p`} size="24px" found={found} />
        <Box
          sx={{
            ...nameStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '4px 0',
          }}>
          <Typography color="common.white" variant="body1">
            {object.name ? object.name : 'Unknown'}
          </Typography>
          {/* !found && (
            <Typography
              sx={{ position: 'absolute', top: '35% ', transform: 'rotate(45deg)', opacity: '30%' }}
              color="red"
              variant="h5">
              Ei Löydetty
            </Typography>
          ) */}
        </Box>
      </Box>
    );
  }

  if (type === 'large') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderStyle: 'solid',
          borderWidth: 'thin',
          padding: '2px',
          backgroundImage: getLocalImage(),
          backgroundSize: 'cover',
        }}>
        <Icon text={`${object.points}p`} size="36px" found={found} />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Icon
            icon={
              <Typography variant="h6" color="common.white">
                V
              </Typography>
            }
            size="36px"
            found
          />
          <Icon
            icon={
              <Typography variant="h6" color="common.white">
                K
              </Typography>
            }
            size="36px"
          />
          <Icon
            icon={
              <Typography variant="h6" color="common.white">
                T
              </Typography>
            }
            size="36px"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} onClick={() => handleClick(object)}>
      <Box
        sx={{
          minWidth: '140px',
          minHeight: '210px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderStyle: 'solid',
          borderRadius: '20px',
          borderWidth: 'thin',
          marginTop: '8px',
          padding: '2px',
          backgroundImage: getLocalImage(),
          backgroundSize: 'cover',
        }}>
        <Icon text={`${object.points}p`} size="36px" found={found} />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Icon icon="V" size="36px" />
          <Icon icon="K" size="36px" />
          <Icon icon="T" size="36px" />
        </Box>
      </Box>
      <Typography variant="h6">{object.name}</Typography>
    </Box>
  );
};

export default Image;
