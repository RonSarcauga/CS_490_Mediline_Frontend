import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://cs-490-mediline-backend-1021109447710.us-central1.run.app/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export default apiClient;