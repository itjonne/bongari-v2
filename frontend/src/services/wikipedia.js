import axios from 'axios';
import { BASE_URL } from './config';

const apiUrl = `${BASE_URL}/objects/wikipedia`;

const getTitle = async (title) => {
  if (!title || typeof title !== 'string') return null;
  try {
    const response = await axios.get(`${apiUrl}/${title}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const wikipedia = { getTitle };

export default wikipedia;
