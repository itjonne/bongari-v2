import axios from 'axios';
// import { parseObjectsArray } from './helpers';

/* eslint-disable */
export const fetchObjects = async () => {
  const response = await axios.get('data/data_v2.json');
  // Tää ehkä axioksella arempi
  // const parsedObjects = parseObjectsArray(response.data);
  // createNewJSON(response.data); Tää tekee uuden jsonin TODO: POISTA
  return response.data;
};
