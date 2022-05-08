import axios from 'axios';
import { BASE_URL } from './config';

// Tällä hetkellä ottaa vastaan käyttäjän, heittää token+id combon headereihin.
export const getFinds = async (user) => {
  console.log('getting finds from', user);
  if (!user) return [];

  try {
    if (!user.token) {
      console.log('no token found');
      return [];
    }
    const response = await axios.get(`${BASE_URL}/finds/self`, {
      headers: { Authorization: `Bearer ${user.token}`, User: user.id },
    });
    return response.data;
  } catch (error) {
    console.log('Errors fetching finds data', error);
    return [];
  }
};

export const getLatestFinds = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/finds/latest`);
    console.log('got latest finds', response.data);
    return response.data;
  } catch (error) {
    console.error('Problems getting latest finds');
    return [];
  }
};

export const addFind = async ({ user, object, body }) => {
  console.log('addfindservice', user, object);
  if (!user) return null;

  try {
    if (!user.token) {
      console.log('no token found');
      return null;
    }
    const response = await axios.post(
      `${BASE_URL}/finds/self/${object.id}`,
      body, // Postataan tyhjä, muuten ei ymmärrä noita headereita
      {
        headers: { Authorization: `Bearer ${user.token}`, User: user.id },
      }
    );
    return response.data;
  } catch (error) {
    console.log('Errors fetching finds data', error);
    return null;
  }
};

export const removeFind = async ({ user, find }) => {
  console.log('removeFinds', user, find);
  if (!user) return null;

  try {
    if (!user.token) {
      console.log('no token found');
      return null;
    }
    const response = await axios.delete(`${BASE_URL}/finds/self/${find.id}`, {
      headers: { Authorization: `Bearer ${user.token}`, User: user.id },
    });
    return response.data;
  } catch (error) {
    console.log('Errors fetching finds data', error);
    return null;
  }
};

const findsService = {
  addFind,
  getFinds,
  removeFind,
};

export default findsService;
