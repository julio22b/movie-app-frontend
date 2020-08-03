import { Review } from '../features/types';
import Axios from 'axios';
import authHeader from './authHeader';

const baseUrl = `http://localhost:3001/api/reviews`;

const postReview = async (
    data: Pick<Review, 'content' | 'liked_movie' | 'rating'>,
    movieID: string,
    userID: string,
) => {
    const response = await Axios.post(`${baseUrl}/${movieID}/${userID}/create`, data, {
        headers: authHeader(),
    });
    return response.data;
};

export default {
    postReview,
};
