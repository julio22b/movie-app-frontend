import Axios from 'axios';
import { MovieList } from '../features/types';
import authHeader from './authHeader';

const baseUrl = 'http://localhost:3001/api/movie-lists';

const createList = async (movieList: MovieList, userID: string) => {
    const response = await Axios.post(`${baseUrl}/${userID}`, movieList, { headers: authHeader() });
    return response.data;
};

export default {
    createList,
};
