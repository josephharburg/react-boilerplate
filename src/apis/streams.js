import axios from 'axios';

//this is so we can make requests to our own server
export default axios.create({
  baseURL: 'http://localhost:3001'
});
