import api from './api';

export const uploadContact = (data) => {
    return api.post('/contact/upload', data);
};