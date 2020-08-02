import authHeader from './authHeader';
import Axios from 'axios';
import { MovieInstance } from '../features/types';

const baseUrl = 'http://localhost:3001/api/movies';

const getMovieInstance = async (obj: MovieInstance) => {
    const response = await Axios.post(`${baseUrl}/create`, obj, {
        headers: authHeader(),
    });
    return response.data as MovieInstance;
};

export default {
    getMovieInstance,
};
