import { Review } from '../features/types';
import Axios from 'axios';
import authHeader from './authHeader';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/reviews`;

type ReviewData = Pick<Review, 'content' | 'first_watch' | 'liked_movie' | 'rating' | 'watched_on'>;

const postReview = async (data: ReviewData, movieID: string, userID: string) => {
    const response = await Axios.post(`${baseUrl}/${movieID}/${userID}/create`, data, {
        headers: authHeader(),
    });
    return response.data;
};

const getReviewsByFriends = async (userID: string, amount: number) => {
    const response = await Axios.get(`${baseUrl}/${userID}/friends?amount=${amount}`, {
        headers: authHeader(),
    });
    return response.data;
};

const likeReview = async (userID: string, reviewID: string) => {
    const response = await Axios.put(`${baseUrl}/${userID}/like/${reviewID}`, null, {
        headers: authHeader(),
    });
    return response.data;
};

const getReview = async (reviewID: string) => {
    const response = await Axios.get(`${baseUrl}/${reviewID}`);
    return response.data;
};

const postComment = async (userID: string, reviewID: string, content: string) => {
    const response = await Axios.post(
        `${baseUrl}/${userID}/comment/${reviewID}`,
        { content },
        { headers: authHeader() },
    );
    return response.data;
};

const getLatests = async (amount: number) => {
    const response = await Axios.get(`${baseUrl}/all/latest?amount=${amount}`, {
        headers: authHeader(),
    });
    return response.data;
};

export const reviewService = {
    postReview,
    likeReview,
    getReview,
    postComment,
    getReviewsByFriends,
    getLatests,
};
