import { Typography, Box, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLatestFinds } from '../services/finds';
import { PRIMARY } from '../config/theme';

const LatestFinds = () => {
  const [finds, setFinds] = useState([]);

  useEffect(() => {
    const asyncGetLatestFinds = async () => {
      const finds = await getLatestFinds();
      setFinds(finds);
    };

    asyncGetLatestFinds();
  }, []);

  return (
    <Box sx={{ padding: '0 16px' }}>
      <Typography variant="h4">Viimeisimmät bongaukset:</Typography>
      <Box sx={{ paddingTop: '16px' }}>
        {finds.map((find, i) => (
          <Box key={find.id} sx={{ paddingBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: '40px',
                height: '40px',
                borderStyle: 'solid',
                borderWidth: 'thin',
                borderColor: 'common.black',
                bgcolor: PRIMARY,
              }}
              alt={`leaderboard-image-${find.id}`}
              src={`/images/${find.objectId?.category}/thumbnails/${find.objectId?.name}.png`}>
              <Typography variant="h6">{i + 1}</Typography>
            </Avatar>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: '8px',
                alignItems: 'center',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingLeft: '16px',
                }}>
                <Box>
                  <Typography variant="h6">{find.objectId?.name}</Typography>
                  <Typography variant="h6" color="gray">
                    {find.createdAt.split('T')[0]}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="gray">
                    {find.userId?.email.split('@')[0]}
                  </Typography>
                </Box>
                <Box></Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LatestFinds;
