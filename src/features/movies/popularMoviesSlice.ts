import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../app/store';
import { MovieOMDB, MovieInstance } from '../types';
import movieService from '../../services/movieService';

interface InitStatePopular {
    loading: boolean;
    errors: boolean;
    topSix: MovieOMDB[];
    movie_for_review: {
        movie: MovieInstance | null;
        loading: boolean;
    };
}

const initialState: InitStatePopular = {
    loading: false,
    errors: false,
    topSix: [],
    movie_for_review: {
        movie: null,
        loading: false,
    },
};

const popularMoviesSlice = createSlice({
    name: 'popularMovies',
    initialState,
    reducers: {
        getPopularMovies: (state) => {
            state.loading = true;
        },
        getPopularMoviesSuccess: (state, action: PayloadAction<MovieOMDB[]>) => {
            state.loading = false;
            state.errors = false;
            state.topSix = action.payload;
        },
        getPopularMoviesFailure: (state) => {
            state.loading = false;
            state.errors = true;
        },
        getMovieForReview: (state) => {
            state.movie_for_review.loading = true;
        },
        getMovieForReviewSuccess: (state, action: PayloadAction<MovieInstance>) => {
            state.movie_for_review.movie = action.payload;
            state.movie_for_review.loading = false;
        },
        removeMovieForReview: (state) => {
            state.movie_for_review.movie = null;
        },
    },
});

export const {
    getPopularMovies,
    getPopularMoviesSuccess,
    getPopularMoviesFailure,
    getMovieForReview,
    getMovieForReviewSuccess,
    removeMovieForReview,
} = popularMoviesSlice.actions;

export const fetchPopularMovies = (): AppThunk => async (dispatch) => {
    dispatch(getPopularMovies());
    try {
        const movies = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`,
        );
        const top6Popular = movies.data.results.slice(0, 6);
        dispatch(getPopularMoviesSuccess(top6Popular));
    } catch {
        dispatch(getPopularMoviesFailure());
    }
};

export const fetchMovieForReview = (obj: MovieInstance): AppThunk => async (dispatch) => {
    dispatch(getMovieForReview());
    const movie = await movieService.getMovieInstance(obj);
    dispatch(getMovieForReviewSuccess(movie));
};

export default popularMoviesSlice.reducer;
