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
    movie_for_page: {
        movie: MovieInstance | null;
        loading: boolean;
        error: boolean;
        backdrop: string;
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
    movie_for_page: {
        movie: null,
        loading: false,
        error: false,
        backdrop: '',
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
        getMovieForPage: (state) => {
            state.movie_for_page.loading = true;
            state.movie_for_page.error = false;
        },
        getMovieForPageSuccess: (state, action: PayloadAction<MovieInstance>) => {
            state.movie_for_page.movie = action.payload;
            state.movie_for_page.loading = false;
            state.movie_for_page.error = false;
        },
        getMovieForPageFailure: (state) => {
            state.movie_for_page.loading = false;
            state.movie_for_page.error = true;
        },
        setBackdropForPage: (state, action: PayloadAction<string>) => {
            state.movie_for_page.backdrop = action.payload;
        },
        removeMovieForPage: (state) => {
            state.movie_for_page.error = false;
            state.movie_for_page.loading = false;
            state.movie_for_page.movie = null;
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
    getMovieForPage,
    getMovieForPageSuccess,
    getMovieForPageFailure,
    removeMovieForPage,
    setBackdropForPage,
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
    const username = JSON.parse(localStorage.getItem('filmlyCurrentUser')!).username;
    const movie = await movieService.getMovieInstance(obj, username);
    dispatch(getMovieForReviewSuccess(movie));
};

export const fetchMovieForPage = (obj: MovieInstance): AppThunk => async (dispatch) => {
    dispatch(getMovieForPage());
    try {
        const movie = await movieService.getMovieInstance(obj);
        dispatch(getMovieForPageSuccess(movie));
    } catch {
        dispatch(getMovieForPageFailure());
    }
};

export const fetchBackdropForPage = (searchQuery: string): AppThunk => async (dispatch) => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
    );
    dispatch(setBackdropForPage(response.data.results[0].backdrop_path));
};

export default popularMoviesSlice.reducer;
