import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';
import { Review } from '../types';
import authHeader from '../../services/authHeader';

interface initialState {
    reviews: Review[];
    latest_reviews: Review[];
    error: boolean;
    openSearchMovie: boolean;
}

const initialState: initialState = {
    reviews: [],
    latest_reviews: [],
    error: false,
    openSearchMovie: false,
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        getLatestReviews: (state, { payload }: PayloadAction<Review[]>) => {
            state.latest_reviews = payload;
        },
        changeModalState: (state) => {
            state.openSearchMovie = !state.openSearchMovie;
        },
    },
});

export const { getLatestReviews, changeModalState } = reviewsSlice.actions;

export const fetchLatestReviews = (): AppThunk => async (dispatch) => {
    const data = await axios.get(`http://localhost:3001/api/reviews/all/latest?amount=10`, {
        headers: authHeader(),
    });
    dispatch(getLatestReviews(data.data));
};

export default reviewsSlice.reducer;
