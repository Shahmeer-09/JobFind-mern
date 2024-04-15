import axios from 'axios';

const customFetch = axios.create({
  baseURL: `/api/jm`,
});

export default customFetch;