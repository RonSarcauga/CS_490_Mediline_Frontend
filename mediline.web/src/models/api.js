import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5555/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export default apiClient;