import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/objects/wikipedia';

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
