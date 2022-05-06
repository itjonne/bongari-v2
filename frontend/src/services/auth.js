import axios from 'axios';
import { BASE_URL } from './config';

const register = async ({ email, password }) => {
  const REGISTER_URL = `${BASE_URL}/auth/register`;
  try {
    const response = await axios.post(REGISTER_URL, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const login = async ({ email, password }) => {
  const LOGIN_URL = `${BASE_URL}/auth/login`;
  console.log('logging in', email, password);
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return null;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
