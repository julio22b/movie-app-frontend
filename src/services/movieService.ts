import authHeader from './authHeader';
import Axios from 'axios';
import { MovieInstance } from '../features/types';

const baseUrl = 'http://localhost:3001/api/movies';
const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}`;

const getMovieInstance = async (obj: MovieInstance, username?: string) => {
    const response = await Axios.post(`${baseUrl}/create?username=${username}`, obj, {
        headers: authHeader(),
    });
    return response.data as MovieInstance;
};

const useOMDB = async (title: string, year?: string): Promise<MovieInstance | undefined> => {
    const processedTitle = title.replace(' ', '+');
    const response = await Axios.get(`${OMDB_URL}&t=${processedTitle}&y=${year}`);
    const data = response.data;
    if (!data.Error) {
        const year = data.Year.slice(0, 4);
        return {
            title: data.Title,
            year,
            synopsis: data.Plot,
            poster: data.Poster,
            director: data.Director,
            actors: data.Actors.split(','),
            country: data.Country,
            genres: data.Genre.split(','),
            language: data.Language,
            run_time: data.Runtime,
        } as MovieInstance;
    }
};

const changeLikeStatus = async (
    userID: string | undefined,
    movieID: string | undefined,
    action: 'like' | 'unlike',
) => {
    const response = await Axios.put(`${baseUrl}/${userID}/${action}/${movieID}`, null, {
        headers: authHeader(),
    });
    return response.data;
};

export default {
    getMovieInstance,
    useOMDB,
    changeLikeStatus,
};
