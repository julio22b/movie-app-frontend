import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { Review } from '../types';
import reviewService from '../../services/reviewService';

interface initialState {
    reviews: Review[];
    latest_reviews: Review[];
    error: boolean;
    loading: boolean;
    openSearchMovie: boolean;
}

const initialState: initialState = {
    reviews: [],
    latest_reviews: [],
    error: false,
    loading: false,
    openSearchMovie: false,
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        getLatestReviews: (state) => {
            state.loading = true;
            state.error = false;
        },
        getLatestReviewsSuccess: (state, { payload }: PayloadAction<Review[]>) => {
            state.latest_reviews = payload;
            state.loading = false;
            state.error = false;
        },
        getLatestReviewsFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        changeModalState: (state) => {
            state.openSearchMovie = !state.openSearchMovie;
        },
    },
});

export const {
    getLatestReviews,
    getLatestReviewsFailure,
    getLatestReviewsSuccess,
    changeModalState,
} = reviewsSlice.actions;

export const fetchLatestReviews = (): AppThunk => async (dispatch) => {
    dispatch(getLatestReviews());
    try {
        const data = await reviewService.getLatests(10);
        dispatch(getLatestReviewsSuccess(data));
    } catch {
        dispatch(getLatestReviewsFailure());
    }
};

export default reviewsSlice.reducer;
