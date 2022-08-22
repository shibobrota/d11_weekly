import axios from 'axios';
import {Collection} from './types';

const BASE_URL = 'https://api.opensea.io/api/v1/collections';

export const getAllData = ({start, end}: {start: number; end: number}) => {
  const url = BASE_URL + '?offset=' + start + '&limit=' + end;
  return axios.get<{collections: Collection[]}>(url);
};
