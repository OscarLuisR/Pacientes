import axios from 'axios';

const baseURL = 'http://localhost:3040/api/';

export default axios.create({
    baseURL,
});