import axios from 'axios';

const customFetch = axios.create({
  baseURL: `${window.location.origin}/api/jm`,
});

export default customFetch;