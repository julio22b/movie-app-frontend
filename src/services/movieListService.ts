import Axios from 'axios';
import { MovieList } from '../features/types';
import authHeader from './authHeader';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/movie-lists`;

const createList = async (movieList: Omit<MovieList, 'user'>, userID: string) => {
    const response = await Axios.post(`${baseUrl}/${userID}`, movieList, { headers: authHeader() });
    return response.data;
};

const getListsByFriends = async (userID: string, amount: number) => {
    const response = await Axios.get(`${baseUrl}/${userID}/friends?amount=${amount}`, {
        headers: authHeader(),
    });
    return response.data;
};

export const movieListService = {
    createList,
    getListsByFriends,
};
