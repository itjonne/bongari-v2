import { Avatar, Box, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { getLeaderboard } from '../services/users';
import LoadingComponent from './LoadingComponent';
import { PRIMARY } from '../config/theme';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const asyncLeaderboard = async () => {
      const data = await getLeaderboard();
      if (data) setLeaderboard(data);
    };
    asyncLeaderboard();
  }, []);

  if (leaderboard.length === 0) return <LoadingComponent />;

  return (
    <Box sx={{ padding: '0 16px' }}>
      <Typography variant="h4">Parhaat Bongaajat:</Typography>
      <Box sx={{ paddingTop: '16px' }}>
        {leaderboard.map((user, i) => (
          <Box key={user.id} sx={{ paddingBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: '40px',
                height: '40px',
                borderStyle: 'solid',
                borderWidth: 'thin',
                borderColor: 'common.black',
                bgcolor: PRIMARY,
              }}
              alt={`leaderboard-image-${user.id}`}>
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
                <Typography variant="h6">{user.email.split('@')[0]}</Typography>
                <Typography variant="h6" color="gray">
                  {user.points} Bongausta
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default memo(Leaderboard);
