import axios from 'axios';

const publishesApi = axios.create({baseURL: 'http://www.mocky.io/v2/5be5e3fa2f000082000fc3f8'});

export default publishesApi;