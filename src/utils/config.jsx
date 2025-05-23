import axios from "axios";

export const API = axios.create({
    baseURL: 'https://kirim-chiqim-new.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['token'] = token;
    }
    return config;
},
    (error) => Promise.reject(error));