import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Accept': 'application/json',
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la API:', error);
        return Promise.reject(error);
    }
);

export default api;