import axios from 'axios';
import { BASE_URL } from './config';

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/leaderboard`);
    console.log('got leaderboard', response.data);
    return response.data;
  } catch (error) {
    console.log('Errors fetching leaderboard', error);
    return [];
  }
};
