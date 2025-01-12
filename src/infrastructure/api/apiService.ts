import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL de base pour les requêtes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;