import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../app/store';

export interface MovieOMDB {
    poster_path: string;
    id: number;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface InitState {
    loading: boolean;
    errors: boolean;
    movies: MovieOMDB[];
}

const initialState: InitState = {
    loading: false,
    errors: false,
    movies: [],
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        getPopularMovies: (state) => {
            state.loading = true;
        },
        getPopularMoviesSuccess: (state, action: PayloadAction<MovieOMDB[]>) => {
            state.loading = false;
            state.errors = false;
            state.movies = action.payload;
        },
        getPopularMoviesFailure: (state) => {
            state.loading = false;
            state.errors = true;
        },
    },
});

export const {
    getPopularMovies,
    getPopularMoviesSuccess,
    getPopularMoviesFailure,
} = movieSlice.actions;

export const fetchPopularMovies = (): AppThunk => async (dispatch) => {
    dispatch(getPopularMovies());
    try {
        const movies = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`,
        );
        const top6Popular = movies.data.results.slice(0,6)
        dispatch(getPopularMoviesSuccess(top6Popular));
    } catch {
        dispatch(getPopularMoviesFailure());
    }
};

export default movieSlice.reducer;
