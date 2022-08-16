import axios from 'axios';
import {Collection} from './types';

const BASE_URL = 'https://api.opensea.io/api/v1/collections';

export const getAllData = (val: {start: number; end: number}) => {
  const url = BASE_URL + '?offset=' + val.start + '&limit=' + val.end;
  return axios.get<{collections: Collection[]}>(url);
};
